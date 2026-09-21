import { useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleIncrement = () => {
    setCount(count + 1);
    countRef.current += 1;

    console.log("STATE-COUNT:", count);
    console.log("COUNTREF::", countRef.current);
  };

  return (
    <div className="app-shell">
      <div className="demo-card">
        <p className="eyebrow">React Hook Demo</p>
        <h1>useRef Hook</h1>

        <div className="counter-box">
          <span className="counter-label">COUNT</span>
          <span className="counter-value">{count}</span>
          {/* Can not be used useRef like this */}
          {/* <span className="counter-value">{countRef}</span> */}
        </div>

        <p className="helper-text">
          useRef keeps a mutable value that does not trigger a re-render.
        </p>

        <button className="increment-btn" onClick={handleIncrement}>
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;
