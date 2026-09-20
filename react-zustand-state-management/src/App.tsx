import { useEffect } from "react";
import { useCounterStore } from "./state/store";


//Utilise the use case of useCounterStore 
const logCount = () => {
  const count = useCounterStore.getState().count;
  console.log("Log-Count", count);

  //Also set the values thorugh setState
  // useCounterStore.setState({ count: 1 })

};

function App() {
  const count = useCounterStore((state) => state.count);

  //Less Performance Code by using Destructuring
  // const { count } = useCounterState((state) => state)

  return <OtherComponent count={count} />;
}

const OtherComponent = ({ count }: { count: number }) => {
  const increment = useCounterStore((state) => state.increment);

  //Import Async Funtion Here
  const incrementAsync = useCounterStore((state) => state.incrementAsync);

  const decrement = useCounterStore((state) => state.decrement);

  //Mount logCount on UseEffect Hook
  useEffect(() => {
    logCount();
  });

  return (
    <div className="other-component">
      <h5>State Management - Zustand</h5>
      {count}
      <div className="counter-actions">
        {/* <button className="counter-button counter-button--primary" onClick={increment}>
        Increment
      </button> */}
        <button
          className="counter-button counter-button--primary"
          onClick={incrementAsync}
        >
          IncrementAsync
        </button>
        <button
          className="counter-button counter-button--secondary"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default App;
