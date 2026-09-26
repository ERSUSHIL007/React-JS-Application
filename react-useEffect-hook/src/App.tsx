import { useState, useEffect } from "react";
import "./App.css";

interface AppProps {}

function App({}: AppProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //The Code That We Want to Run

    console.log("Count::", count);

    //Optional Return Function
    return () => {
      //clean up side effects created by the effect before the component
      // unmounts or before the effect runs again on subsequent renders
      console.log("Clean Up Side Effect!");
    };
  }, [count]); // The Dependency Array
  // if you do not provide dependency array the Return Fuction still runs while Unmount

  return (
    <div className="effect">
      <section className="effect__panel">
        <p className="effect__eyebrow">React hooks</p>
        <h1 className="effect__title">useEffect counter</h1>
        <p className="effect__count-label">Current count</p>
        <p className="effect__count" aria-live="polite">
          {count}
        </p>
        <div className="effect__actions">
          <button
            className="effect__button effect__button--decrement"
            onClick={() => setCount(count - 1)}
          >
            Decrement
          </button>
          <button
            className="effect__button effect__button--increment"
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
