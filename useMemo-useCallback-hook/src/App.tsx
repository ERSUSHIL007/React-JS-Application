import { useCallback, useMemo, useState } from "react";
import CustomList from "./CustomList";
import Button from "./ui/Button";

function App() {
  const [title, setTitle] = useState("Default Title!");

  const changeTitleHandler = useCallback(() => {
    setTitle("New Title!!");
  }, []);

  const listItems = useMemo(() => {
    return [2, 4, 3, 1, 5]; // Memoized Version
  }, []);

  console.log("App Component Running!");

  return (
    <div>
      <h3> Demo Application - UseMemo & UseCallback </h3>
      <CustomList title={title} list={listItems} />
      <Button onClick={changeTitleHandler}> Change Title </Button>
    </div>
  );
}

export default App;
