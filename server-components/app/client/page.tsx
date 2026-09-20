"use client"

import { expensiveFunction } from "@/expensiveFunction";
import ServerComponent from "@/ServerComponent";
import { useEffect, useState } from "react";

export default function ClientPage() {
    console.log("Client Component!")
    expensiveFunction()

    const [data, setData] = useState()

    useEffect(() => {
        fetch('/api/data')
            .then((res) => res.json())
            .then((data) => setData(data))
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold text-center">
                Client Side Rendering!! <br />
                This runs on the Client
            </h1>
            <br />
            <button className="mx-auto block rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                onClick={() => console.log('Clicked!')}
            >Click me</button>

            <ServerComponent />
        </div>
    );
}
