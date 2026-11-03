import { loadPython, runPythonProgram } from "./pythonRunner";
import { runGameCollectionManager } from "./gameCollectionManager";

// Projects that visitors can run in their project popup (TerminalRunner.jsx), keyed by the project's `play` value
export const TERMINAL_PROGRAMS = {
  "dice-game": {
    command: "python main.py",
    intro: "This is the real Python code, running right here in your browser.",
    tip: "Tip: choose 1 to sign up, then 2 to log in. Accounts only live in your browser.",
    runLabel: "Run the game",
    // Pauses in the game (time.sleep) run at half length so visitors aren't kept waiting
    program: async ({ write, readLine, ready }) => {
      const [pyodide, source] = await Promise.all([
        loadPython(),
        fetch("/projects/dice-game/main.py").then((res) => {
          if (!res.ok) throw new Error("Couldn't load the game");
          return res.text();
        }),
      ]);
      ready();
      await runPythonProgram(pyodide, source, { write, readLine, sleepScale: 0.5 });
    },
  },
  "game-collection-manager": {
    command: "java Main",
    intro: "A browser version of my Java app: the same menus and behavior, with the database kept in your browser instead of PostgreSQL.",
    tip: "Tip: the collection starts empty. Choose 1 to add a game, then 2 to see it.",
    runLabel: "Run the app",
    program: runGameCollectionManager,
  },
};
