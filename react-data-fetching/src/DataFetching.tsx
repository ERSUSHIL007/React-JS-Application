"use client"
import { useState, useEffect, useRef } from "react";

const BaseUrl = "https://jsonplaceholder.typicode.com";

interface Post {
    id: number;
    title: string;
}

const App = () => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {

        const fetchposts = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);

            try {
                const response = await fetch(`${BaseUrl}/posts?page=${page}`, {
                    signal: abortControllerRef.current?.signal,
                });
                const posts = (await response.json()) as Post[];
                // console.log(posts);
                setPosts(posts);
            } catch (error: any) {
                if (error.name === "AbortError") {
                    console.log("Aborted!");
                    return;
                }

                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchposts();
    }, [page]);

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    if (error) {
        return <div>Something went wrong! Please try again later</div>
    }

    return (
        <div>
            <h1>Data Fetching in React - 1</h1>
            <button
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
                Next Page {page}
            </button>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;