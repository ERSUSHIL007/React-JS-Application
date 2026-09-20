import ClientComponent from "@/ClientComponent";
import { expensiveFunction } from "@/expensiveFunction";
import ServerComponent from "@/ServerComponent";

export default async function ServerPage() {
  console.log("Server Component!")
  // expensiveFunction()

  // const data = await fetch("/api/data").then((res) => res.json())

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Server Side Rendering!! <br />
        This runs on the server
      </h1> <br />

      {/* <button className="mx-auto block rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        onClick={() => console.log('Clicked!')}
      >Click me</button> */}

      {/* {data} */}

      <ClientComponent>
        <ServerComponent />
      </ClientComponent>

    </div>
  );
}
