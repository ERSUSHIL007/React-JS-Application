# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  # React Hook Form, Zod, and Zod Resolver

  This project demonstrates a typed login form built with React, TypeScript, React Hook Form, and Zod.

  ## Libraries Used

  ### React Hook Form

  [React Hook Form](https://react-hook-form.com/) manages form state and submission with minimal re-renders. The `register` function connects each input to the form, while `handleSubmit` runs validation before calling the submit handler.

  ```tsx
  const { register, handleSubmit } = useForm<FormFields>()

  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('email')} />
  </form>
````

### Zod

[Zod](https://zod.dev/) defines the validation rules for the form. In this example, the email must be valid and the password must contain at least six characters.

```tsx
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

The form type is generated directly from the schema, so the validation rules and TypeScript type stay in sync:

```tsx
type FormFields = z.infer<typeof schema>;
```

### Zod Resolver

`@hookform/resolvers` connects external validation libraries to React Hook Form. `zodResolver` uses the Zod schema whenever the form is submitted and makes validation messages available through `formState.errors`.

```tsx
const form = useForm<FormFields>({
  resolver: zodResolver(schema),
});
```

## Form Flow

1. `register` registers the email and password inputs.
2. `zodResolver(schema)` validates their values with Zod.
3. Validation messages are read from `errors.email` and `errors.password`.
4. `handleSubmit` calls `onSubmit` only when the data is valid.
5. `isSubmitting` disables the submit button while the asynchronous submission is running.
6. `setError('root', ...)` displays a form-level error when submission fails.

## Run the Project

```bash
npm install
npm run dev
```

The main example is implemented in `src/ReactHookForm.tsx`.
