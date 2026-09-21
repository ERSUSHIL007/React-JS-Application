import { useEffect, useRef } from "react";

function DemoUseRef() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    console.log("InputRef", inputRef);
  });

  return (
    <div className="app-shell">
      <div className="demo-card">
        <p className="eyebrow">React Hook Demo</p>
        <h1>useRef Hook</h1>

        <div className="counter-box">
          <input ref={inputRef} type="text" placeholder="Searching..." />
        </div>

        <p className="helper-text">
          useRef keeps a mutable value that does not trigger a re-render.
        </p>
      </div>
    </div>
  );
}

export default DemoUseRef;
