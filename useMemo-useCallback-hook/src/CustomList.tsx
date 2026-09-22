import React, { useMemo } from "react";

interface CustomListProps {
  title: string;
  list: number[];
}

const CustomList = (props: CustomListProps) => {
  const { list } = props;

  //Wrap SortedList in UseMomo Hook
  const sortedList = useMemo(() => {
    console.log("SortedList Method Called!");
    return list.sort((a: number, b: number) => a - b);
  }, [list]);

  console.log("CustomList Component Called!");

  return (
    <div className="lis">
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

// Export level to memoize an entire component
export default React.memo(CustomList);
