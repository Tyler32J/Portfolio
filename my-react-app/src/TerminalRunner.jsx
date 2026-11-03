import { useEffect, useRef, useState } from "react";
import "./TerminalRunner.css";

// A terminal window that runs a project's program in the browser. Visitors type answers at the prompt.
// `program({ write, readLine, ready })` runs the program: write() prints, readLine(prompt) resolves with
// what the visitor typed, and ready() swaps the loading message for the program's output.
const TerminalRunner = ({ program, title, intro, tip, runLabel = "Run it" }) => {
  // "idle" | "loading" | "running" | "done" | "error"
  const [phase, setPhase] = useState("idle");
  const [output, setOutput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [line, setLine] = useState("");
  const pendingRef = useRef(null);
  const runIdRef = useRef(0);
  const screenRef = useRef(null);
  const inputRef = useRef(null);

  // Keep the newest output in view
  useEffect(() => {
    const screen = screenRef.current;
    if (screen) {
      screen.scrollTop = screen.scrollHeight;
      screen.scrollLeft = 0;
    }
  }, [output, waiting]);

  useEffect(() => {
    // preventScroll: focusing shouldn't slide a wide terminal sideways
    if (waiting) inputRef.current?.focus({ preventScroll: true });
  }, [waiting]);

  // Closing the popup mid-run: stop answering the old run
  useEffect(() => () => {
    runIdRef.current += 1;
  }, []);

  const start = async () => {
    const runId = ++runIdRef.current;
    const isCurrent = () => runId === runIdRef.current;
    pendingRef.current = null;
    setWaiting(false);
    setLine("");
    setOutput("");
    setPhase("loading");

    try {
      await program({
        ready: () => {
          if (isCurrent()) setPhase("running");
        },
        write: (text) => {
          if (isCurrent()) setOutput((prev) => prev + text);
        },
        readLine: (prompt = "") => {
          if (!isCurrent()) return new Promise(() => {});
          setOutput((prev) => prev + prompt);
          setWaiting(true);
          return new Promise((resolve) => {
            pendingRef.current = resolve;
          });
        },
      });
      if (isCurrent()) setPhase("done");
    } catch (error) {
      if (!isCurrent()) return;
      setOutput((prev) => `${prev}\n${error.message || error}\n`);
      setPhase("error");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const resolve = pendingRef.current;
    if (!resolve) return;
    pendingRef.current = null;
    setOutput((prev) => `${prev}${line}\n`);
    setLine("");
    setWaiting(false);
    resolve(line);
  };

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="terminal-title">{title}</span>
        {(phase === "done" || phase === "error" || phase === "running") && (
          <button type="button" className="terminal-restart" onClick={start}>Restart</button>
        )}
      </div>

      <div
        ref={screenRef}
        className="terminal-screen"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        role="log"
        aria-live="polite"
        aria-label={`${title} output`}
      >
        {phase === "idle" ? (
          <div className="terminal-start">
            <p>{intro}</p>
            {tip && <p className="terminal-tip">{tip}</p>}
            <button type="button" className="terminal-run btn-shine" onClick={start}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              {runLabel}
            </button>
          </div>
        ) : (
          <pre className="terminal-output">
            {phase === "loading" ? "Starting… (the first run takes a few seconds)\n" : output}
            {waiting && (
              <form className="terminal-input" onSubmit={submit}>
                <input
                  ref={inputRef}
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  aria-label="Type your answer and press Enter"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  enterKeyHint="send"
                />
              </form>
            )}
            {phase === "done" && <span className="terminal-ended">{"\n"}[Program finished. Press Restart to run it again.]</span>}
          </pre>
        )}
      </div>
    </div>
  );
};

export default TerminalRunner;
