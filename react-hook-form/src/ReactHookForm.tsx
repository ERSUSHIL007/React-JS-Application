import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type FormFields = z.infer<typeof schema>

const ReactHookForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormFields>({
        defaultValues: {
            email: 'test@example.com',
        },
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
            console.log("Form Data", data);
        } catch (error) {
            console.error('Error submitting form:', error)
            setError("root", {
                type: "manual",
                message: "An error occurred while submitting the form",
            });
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form
                className="w-full max-w-sm space-y-4 rounded bg-white p-6 shadow"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Welcome back to React Hook Form</h1>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium" htmlFor="email">
                            Email address
                        </label>
                        <input
                            {...register('email')}
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register('password')}
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                </div>

                <button
                    className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                    type="submit" disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "Submit"}
                </button>
                {errors.root && (
                    <p className="text-sm text-red-500">{errors.root.message}</p>
                )}
            </form>
        </main>
    )
}

export default ReactHookForm