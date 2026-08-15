Command to Create React JS Project::
=====================================

> npm create vite@latest project_name

**Example:**
```bash
npm create vite@latest my-react-app
cd my-react-app
npm install
npm run dev
```

Create a React + TypeScript project directly::
==================================================
npm create vite@latest my-react-app -- --template react-ts

**Example:**
```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
```

Routing (Angular RouterModule equivalent)::
===========================================
npm install react-router-dom

**Example:**
```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
```

HTTP Client (Angular HttpClient equivalent):::
==============================================
npm install axios

**Example:**
```jsx
import axios from 'axios';
import { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GET request
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // POST request
  const addUser = (newUser) => {
    axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      .then(response => console.log('User added:', response.data))
      .catch(error => console.error('Error:', error));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

State Management (Angular Service/NgRx equivalent)::
====================================================
npm install zustand

**Example:**
```jsx
// store.js
import { create } from 'zustand';

export const useStore = create((set) => ({
  count: 0,
  user: { name: '', email: '' },
  
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user }),
}));

// Counter.jsx
import { useStore } from './store';

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
```

Use code with caution.Form Validation (Angular Reactive Forms equivalent)::
===========================================================================
npm install react-hook-form

**Example:**
```jsx
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email format'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Min 6 characters' }
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

Notes:
<> </> => Fragment shorthand - Used to group multiple elements without adding extra nodes to the DOM.

**Example:**
```jsx
// Without Fragment - adds extra div
function MyComponent() {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}

// With Fragment - no extra node added to DOM
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}

// Using Fragment explicitly
import { Fragment } from 'react';

function MyComponent() {
  return (
    <Fragment key="item1">
      <h1>Title</h1>
      <p>Content</p>
    </Fragment>
  );
}
```

* For Dynamic Value Propagation - {Dynamic Value Name}
import styleCSS from ./style.css  - <div className={styleCSS}>{styleCSS}</div>


Props => read-only properties that are shared between components.
	A Parent component send data to child component.
	Shared data in key: value pair.
	<Component key=value />

**Example:**
```jsx
// Parent Component
function App() {
  const user = { name: 'John', age: 25, email: 'john@example.com' };
  
  return <UserProfile name={user.name} age={user.age} email={user.email} />;
}

// Child Component - receives props
function UserProfile(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

// Or using destructuring
function UserProfile({ name, age, email }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Example with multiple components
function ParentComponent() {
  const items = ['Apple', 'Banana', 'Orange'];
  
  return (
    <div>
      {items.map(item => (
        <Item key={item} name={item} />
      ))}
    </div>
  );
}

function Item({ name }) {
  return <li>{name}</li>;
}
```

PropTypes => It is a mechanism that ensures data type of props.
	     propTypes is a built-in mechanism used to validate the data types of properties (props) passed to a component.
	     props => name: string

**Example:**
```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email, isActive, hobbies, onUpdate }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <p>Hobbies: {hobbies.join(', ')}</p>
      <button onClick={onUpdate}>Update Profile</button>
    </div>
  );
}

// Define PropTypes
UserCard.propTypes = {
  name: PropTypes.string.isRequired,        // Required string
  age: PropTypes.number.isRequired,          // Required number
  email: PropTypes.string,                   // Optional string
  isActive: PropTypes.bool.isRequired,       // Required boolean
  hobbies: PropTypes.arrayOf(PropTypes.string),  // Array of strings
  onUpdate: PropTypes.func.isRequired,       // Required function
};

// Default values
UserCard.defaultProps = {
  email: 'no-email@example.com',
  isActive: false,
  hobbies: [],
};

export default UserCard;
```

Important React Hooks and Their Use Cases::
===========================================

1. useState Hook
   - Purpose: Add state to functional components
   - Use Case: Manage component-level state like form inputs, toggles, counters
   - Example: const [count, setCount] = useState(0);
   - When to Use: Any time you need to store and update data within a component
   
   **Practical Example:**
   ```jsx
   import { useState } from 'react';

   function Counter() {
     const [count, setCount] = useState(0);
     const [name, setName] = useState('');

     return (
       <div>
         <p>Counter: {count}</p>
         <button onClick={() => setCount(count + 1)}>Increment</button>
         <button onClick={() => setCount(count - 1)}>Decrement</button>

         <input
           value={name}
           onChange={(e) => setName(e.target.value)}
           placeholder="Enter your name"
         />
         <p>Hello, {name}!</p>
       </div>
     );
   }
   
   export default Counter;
   ```

2. useEffect Hook
   - Purpose: Handle side effects in functional components
   - Use Case: API calls, DOM manipulation, subscriptions, timers, cleanup operations
   - Example: useEffect(() => { fetchData(); }, []);
   - When to Use: After component render, data fetching, event listener setup

   **Practical Example:**
   ```jsx
   import { useState, useEffect } from 'react';

   function DataFetcher() {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     // Runs once on component mount
     useEffect(() => {
       fetchData();
     }, []); // Empty dependency array

     // Runs whenever data or count changes
     useEffect(() => {
       console.log('Data updated:', data);
     }, [data]); // Dependency array

     // Cleanup function - runs on unmount
     useEffect(() => {
       const timer = setInterval(() => {
         console.log('Timer running');
       }, 1000);

       return () => clearInterval(timer); // Cleanup
     }, []);

     const fetchData = async () => {
       try {
         const response = await fetch('https://api.example.com/data');
         const result = await response.json();
         setData(result);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error}</p>;
     return <pre>{JSON.stringify(data, null, 2)}</pre>;
   }

   export default DataFetcher;
   ```

3. useContext Hook
   - Purpose: Consume values from React Context API
   - Use Case: Global state management, theme switching, authentication data
   - Example: const theme = useContext(ThemeContext);
   - When to Use: Avoid prop drilling, share data across multiple components

   **Practical Example:**
   ```jsx
   import { createContext, useContext, useState } from 'react';

   // Create Context
   const ThemeContext = createContext();

   // Provider Component
   function ThemeProvider({ children }) {
     const [theme, setTheme] = useState('light');

     const toggleTheme = () => {
       setTheme(theme === 'light' ? 'dark' : 'light');
     };

     return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   }

   // Consumer Component
   function ThemedComponent() {
     const { theme, toggleTheme } = useContext(ThemeContext);

     return (
       <div style={{ background: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
         <p>Current Theme: {theme}</p>
         <button onClick={toggleTheme}>Toggle Theme</button>
       </div>
     );
   }

   // App
   function App() {
     return (
       <ThemeProvider>
         <ThemedComponent />
       </ThemeProvider>
     );
   }

   export default App;
   ```

4. useReducer Hook
   - Purpose: Complex state management with multiple related state updates
   - Use Case: Forms with multiple fields, complex workflows, state machines
   - Example: const [state, dispatch] = useReducer(reducer, initialState);
   - When to Use: When useState becomes complex or multiple state updates are related

   **Practical Example:**
   ```jsx
   import { useReducer } from 'react';

   // Reducer function
   function todoReducer(state, action) {
     switch (action.type) {
       case 'ADD_TODO':
         return {
           ...state,
           todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
         };
       case 'TOGGLE_TODO':
         return {
           ...state,
           todos: state.todos.map(todo =>
             todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
           )
         };
       case 'DELETE_TODO':
         return {
           ...state,
           todos: state.todos.filter(todo => todo.id !== action.payload)
         };
       default:
         return state;
     }
   }

   function TodoApp() {
     const initialState = { todos: [] };
     const [state, dispatch] = useReducer(todoReducer, initialState);

     const addTodo = (text) => {
       dispatch({ type: 'ADD_TODO', payload: text });
     };

     return (
       <div>
         <button onClick={() => addTodo('New Task')}>Add Todo</button>
         <ul>
           {state.todos.map(todo => (
             <li key={todo.id} onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
               <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                 {todo.text}
               </span>
               <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>Delete</button>
             </li>
           ))}
         </ul>
       </div>
     );
   }

   export default TodoApp;
   ```

5. useCallback Hook
   - Purpose: Memoize function definitions to prevent unnecessary recreations
   - Use Case: Optimize performance when passing callbacks to child components
   - Example: const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
   - When to Use: When callback is passed as dependency to child components wrapped in React.memo

   **Practical Example:**
   ```jsx
   import { useCallback, useState, memo } from 'react';

   // Child Component - uses memo to prevent unnecessary re-renders
   const ChildButton = memo(({ onClick, label }) => {
     console.log('ChildButton rendered');
     return <button onClick={onClick}>{label}</button>;
   });

   function ParentComponent() {
     const [count, setCount] = useState(0);
     const [name, setName] = useState('');

     // Without useCallback, handleClick is recreated on every render
     // With useCallback, it's only recreated when count changes
     const handleClick = useCallback(() => {
       console.log('Button clicked, count:', count);
     }, [count]);

     return (
       <div>
         <input value={name} onChange={(e) => setName(e.target.value)} />
         <p>Name: {name}</p>
         <p>Count: {count}</p>
         <button onClick={() => setCount(count + 1)}>Increment</button>
         <ChildButton onClick={handleClick} label="Click Me" />
       </div>
     );
   }

   export default ParentComponent;
   ```

6. useMemo Hook
   - Purpose: Memoize expensive computations
   - Use Case: Heavy calculations, derived data, filtering large datasets
   - Example: const memoizedValue = useMemo(() => expensiveFunction(a, b), [a, b]);
   - When to Use: When computation is expensive and dependencies don't change frequently

   **Practical Example:**
   ```jsx
   import { useMemo, useState } from 'react';

   function DataFilter() {
     const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
     const [multiplier, setMultiplier] = useState(1);

     // Expensive computation - only runs when multiplier changes
     const expensiveResult = useMemo(() => {
       console.log('Computing expensive calculation...');
       let result = 0;
       for (let i = 0; i < 1000000; i++) {
         result += i;
       }
       return result * multiplier;
     }, [multiplier]);

     // Filter list - only runs when numbers changes
     const filteredNumbers = useMemo(() => {
       return numbers.filter(n => n > 2);
     }, [numbers]);

     return (
       <div>
         <p>Expensive Result: {expensiveResult}</p>
         <button onClick={() => setMultiplier(multiplier + 1)}>Increase Multiplier</button>
         
         <p>Filtered Numbers: {filteredNumbers.join(', ')}</p>
         <button onClick={() => setNumbers([...numbers, Math.random()])}>Add Number</button>
       </div>
     );
   }

   export default DataFilter;
   ```

7. useRef Hook
   - Purpose: Access DOM elements or store mutable values that don't cause re-renders
   - Use Case: Focus management, text selection, media playback, storing previous values
   - Example: const inputRef = useRef(null); <input ref={inputRef} />
   - When to Use: Direct DOM access, managing focus, storing non-rendering state

   **Practical Example:**
   ```jsx
   import { useRef } from 'react';

   function TextInput() {
     const inputRef = useRef(null);
     const countRef = useRef(0);

     const focusInput = () => {
       inputRef.current?.focus();
     };

     const selectText = () => {
       inputRef.current?.select();
     };

     const incrementCount = () => {
       // This doesn't cause a re-render
       countRef.current++;
       console.log('Count (no re-render):', countRef.current);
     };

     return (
       <div>
         <input ref={inputRef} type="text" placeholder="Click buttons below" />
         <button onClick={focusInput}>Focus Input</button>
         <button onClick={selectText}>Select Text</button>
         
         <p>Count: {countRef.current}</p>
         <button onClick={incrementCount}>Increment (No Re-render)</button>
       </div>
     );
   }

   export default TextInput;
   ```

8. useLayoutEffect Hook
   - Purpose: Synchronous effect hook that runs before DOM mutations are painted
   - Use Case: DOM measurements, animations, layout calculations
   - Example: useLayoutEffect(() => { /* runs before browser paint */ }, []);
   - When to Use: When you need to measure or manipulate DOM before visual updates

   **Practical Example:**
   ```jsx
   import { useLayoutEffect, useRef, useState } from 'react';

   function MeasureElement() {
     const elementRef = useRef(null);
     const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

     // Runs before DOM is painted - synchronously
     useLayoutEffect(() => {
       if (elementRef.current) {
         const { width, height } = elementRef.current.getBoundingClientRect();
         setDimensions({ width, height });
         console.log('Measured after DOM update, before paint');
       }
     }, []);

     return (
       <div>
         <div
           ref={elementRef}
           style={{
             width: '200px',
             height: '100px',
             background: 'blue',
             color: 'white'
           }}
         >
           Measure me
         </div>
         <p>Width: {dimensions.width}px, Height: {dimensions.height}px</p>
       </div>
     );
   }

   export default MeasureElement;
   ```

9. useImperativeHandle Hook
   - Purpose: Customize instance value exposed to parent via ref
   - Use Case: Creating flexible component APIs, exposing specific methods
   - Example: useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus() }));
   - When to Use: Building reusable components with controlled imperative APIs

   **Practical Example:**
   ```jsx
   import { forwardRef, useImperativeHandle, useRef } from 'react';

   // Child Component with forwardRef
   const CustomInput = forwardRef((props, ref) => {
     const inputRef = useRef(null);

     // Expose custom methods to parent
     useImperativeHandle(ref, () => ({
       focus: () => inputRef.current?.focus(),
       clear: () => (inputRef.current.value = ''),
       getValue: () => inputRef.current?.value,
     }));

     return <input ref={inputRef} type="text" {...props} />;
   });

   // Parent Component
   function ParentComponent() {
     const inputRef = useRef(null);

     const handleFocus = () => inputRef.current?.focus();
     const handleClear = () => inputRef.current?.clear();
     const handleGetValue = () => {
       const value = inputRef.current?.getValue();
       console.log('Input value:', value);
     };

     return (
       <div>
         <CustomInput ref={inputRef} placeholder="Type something..." />
         <button onClick={handleFocus}>Focus Input</button>
         <button onClick={handleClear}>Clear Input</button>
         <button onClick={handleGetValue}>Get Value</button>
       </div>
     );
   }

   export default ParentComponent;
   ```

10. Custom Hooks
    - Purpose: Reuse stateful logic across multiple components
    - Use Case: Shared logic like form handling, data fetching, authentication
    - Example: const useCustomForm = () => { /* custom logic */ return { values, handleChange } };
    - When to Use: When multiple components need the same stateful logic

    **Practical Example:**
    ```jsx
    // Custom Hook - useForm
    import { useState } from 'react';

    function useForm(initialValues, onSubmit) {
      const [values, setValues] = useState(initialValues);
      const [errors, setErrors] = useState({});
      const [touched, setTouched] = useState({});

      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

      const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
      };

      const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
      };

      return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
      };
    }

    // Custom Hook - useFetch
    import { useEffect, useState } from 'react';

    function useFetch(url) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const result = await response.json();
            setData(result);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, [url]);

      return { data, loading, error };
    }

    // Using Custom Hooks
    function LoginComponent() {
      const form = useForm(
        { email: '', password: '' },
        (values) => {
          console.log('Submitted:', values);
        }
      );

      return (
        <form onSubmit={form.handleSubmit}>
          <input
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <button type="button" onClick={form.reset}>Reset</button>
        </form>
      );
    }

    function UsersList() {
      const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;

      return (
        <ul>
          {users?.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    }

    export { useForm, useFetch };
    ```

