// Shared domain shape used by the sample API, product list, and filter workflow.
export type Product = {
  id: number;
  name: string;
  category: "first" | "second" | "third";
  price: number;
  image: string;
};
