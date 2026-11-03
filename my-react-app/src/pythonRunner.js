// Runs a terminal-style Python program in the browser with Pyodide (real Python compiled to WebAssembly).
// Browsers can't pause while a program waits for typing, so before running, the program is rewritten:
// every function becomes async, and input() / time.sleep() become awaits that the page can answer.

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

let pyodidePromise = null;

// Loads Pyodide once (about 10 MB, only when someone presses Run) and reuses it afterwards
export function loadPython() {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${PYODIDE_URL}pyodide.js`;
      script.onload = () => window.loadPyodide({ indexURL: PYODIDE_URL }).then(resolve, reject);
      script.onerror = () => reject(new Error("Couldn't load Python"));
      document.head.appendChild(script);
    }).catch((error) => {
      pyodidePromise = null;
      throw error;
    });
  }
  return pyodidePromise;
}

const PRELUDE = `
import ast, asyncio, os

# Start every run fresh: no saved accounts or history from earlier runs
for _name in os.listdir("."):
    if _name.endswith((".json", ".txt")):
        os.remove(_name)

async def __ainput(prompt=""):
    return str(await __js_read_line(str(prompt)))

async def __asleep(seconds):
    await asyncio.sleep(seconds * __sleep_scale)

class __Asyncify(ast.NodeTransformer):
    def __init__(self, names):
        self.names = names

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        fields = {field: getattr(node, field, None) for field in ast.AsyncFunctionDef._fields}
        return ast.copy_location(ast.AsyncFunctionDef(**fields), node)

    def visit_Call(self, node):
        self.generic_visit(node)
        func = node.func
        if isinstance(func, ast.Name) and func.id == "input":
            node.func = ast.Name(id="__ainput", ctx=ast.Load())
        elif isinstance(func, ast.Attribute) and func.attr == "sleep" and isinstance(func.value, ast.Name) and func.value.id in ("t", "time"):
            node.func = ast.Name(id="__asleep", ctx=ast.Load())
        elif not (isinstance(func, ast.Name) and func.id in self.names):
            return node
        return ast.copy_location(ast.Await(value=node), node)

_tree = ast.parse(__program_source)
_names = {n.name for n in ast.walk(_tree) if isinstance(n, ast.FunctionDef)}
_tree = ast.fix_missing_locations(__Asyncify(_names).visit(_tree))
__program_async = ast.unparse(_tree)
`;

// Runs `source` as if it were the main script. `write(text)` receives everything the program prints;
// `readLine(prompt)` must return a Promise that resolves with what the visitor typed.
export async function runPythonProgram(pyodide, source, { write, readLine, sleepScale = 1 }) {
  pyodide.setStdout({ batched: (text) => write(`${text}\n`) });
  pyodide.setStderr({ batched: (text) => write(`${text}\n`) });

  const globals = pyodide.globals.get("dict")();
  try {
    globals.set("__name__", "__main__");
    globals.set("__js_read_line", readLine);
    globals.set("__sleep_scale", sleepScale);
    globals.set("__program_source", source);
    await pyodide.runPythonAsync(PRELUDE, { globals });
    await pyodide.runPythonAsync(globals.get("__program_async"), { globals });
  } finally {
    globals.destroy();
  }
}
