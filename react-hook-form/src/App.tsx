import { useForm, type SubmitHandler } from 'react-hook-form'

type FormFields = {
  email: string
  password: string
}

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      email: 'test@example.com',
    }
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
      throw new Error();
      console.log("Form Data", data);
    } catch (error) {
      // console.error('Error submitting form:', error)
      setError("root", {
        type: "manual",
        message: "An error occurred while submitting the form",
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <form
        className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to continue to your account</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">
              Email address
            </label>
            <input
              {...register('email',
                {
                  required: "Email is required",
                  // pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
                  validate: (value) => {
                    if (!value.includes('@')) {
                      return "Please enter a valid email address";
                    }
                  }
                })}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              id="email"
              type="email"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              {...register('password',
                {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                })}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.99]"
          type="submit" disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Sign in"}
        </button>
        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}
      </form>
    </main>
  )
}

export default App