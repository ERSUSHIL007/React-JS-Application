import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTodo, fetchTodos } from "./Service";
import TodoCard from "./components/TodoCard";
import { useState } from "react";

export default function Demo() {

    const queryClient = useQueryClient()

    const [search, setSearch] = useState("")
    const [title, setTitle] = useState("")

    const { data: todos, isLoading } = useQuery({
        queryFn: () => fetchTodos(),
        queryKey: ['todos', { search }],
        staleTime: Infinity,
        gcTime: 0,
        // cacheTime: 0,
    })

    const { mutateAsync: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    if (isLoading) {
        return <div className="loading-state">Loading...</div>
    }

    return (
        <main className="todo-app">
            <section className="todo-panel">
                <p className="eyebrow">Async task manager</p>
                <h1>React Query</h1>
                <p className="intro">Keep a small list of things worth getting done.</p>
                <div className="todo-form">
                    <input
                        className="todo-input"
                        type="text"
                        placeholder="What needs doing?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        className="add-button"
                        onClick={
                            async () => {
                                try {
                                    await addTodoMutation({ title })
                                    setTitle("")
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                        }
                    >
                        Add Todo
                    </button>
                </div>
                <div className="todo-list">
                    {todos?.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} />
                    ))}
                </div>
            </section>
        </main>
    );
}