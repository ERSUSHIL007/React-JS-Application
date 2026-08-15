Command to Create React JS Project::
=====================================

> npm create vite@latest project_name

Create a React + TypeScript project directly::
==================================================
npm create vite@latest my-react-app -- --template react-ts

Routing (Angular RouterModule equivalent)::
===========================================
npm install react-router-dom

HTTP Client (Angular HttpClient equivalent):::
==============================================
npm install axios

State Management (Angular Service/NgRx equivalent)::
====================================================
npm install zustand

Use code with caution.Form Validation (Angular Reactive Forms equivalent)::
===========================================================================
npm install react-hook-form

Notes:
<> </> => Fragment shorthand - Used to group multiple elements without adding extra nodes to the DOM.

* For Dynamic Value Propagation - {Dynamic Value Name}
import styleCSS from ./style.css  - <div className={styleCSS}>{styleCSS}</div>


Props => read-only properties that are shared between components.
	A Parent component send data to child component.
	Shared data in key: value pair.
	<Component key=value />

PropTypes => It is a mechanism that ensures data type of props.
	     propTypes is a built-in mechanism used to validate the data types of properties (props) passed to a component.
	     props => name: string

Important React Hooks and Their Use Cases::
===========================================

1. useState Hook
   - Purpose: Add state to functional components
   - Use Case: Manage component-level state like form inputs, toggles, counters
   - Example: const [count, setCount] = useState(0);
   - When to Use: Any time you need to store and update data within a component

2. useEffect Hook
   - Purpose: Handle side effects in functional components
   - Use Case: API calls, DOM manipulation, subscriptions, timers, cleanup operations
   - Example: useEffect(() => { fetchData(); }, []);
   - When to Use: After component render, data fetching, event listener setup

3. useContext Hook
   - Purpose: Consume values from React Context API
   - Use Case: Global state management, theme switching, authentication data
   - Example: const theme = useContext(ThemeContext);
   - When to Use: Avoid prop drilling, share data across multiple components

4. useReducer Hook
   - Purpose: Complex state management with multiple related state updates
   - Use Case: Forms with multiple fields, complex workflows, state machines
   - Example: const [state, dispatch] = useReducer(reducer, initialState);
   - When to Use: When useState becomes complex or multiple state updates are related

5. useCallback Hook
   - Purpose: Memoize function definitions to prevent unnecessary recreations
   - Use Case: Optimize performance when passing callbacks to child components
   - Example: const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
   - When to Use: When callback is passed as dependency to child components wrapped in React.memo

6. useMemo Hook
   - Purpose: Memoize expensive computations
   - Use Case: Heavy calculations, derived data, filtering large datasets
   - Example: const memoizedValue = useMemo(() => expensiveFunction(a, b), [a, b]);
   - When to Use: When computation is expensive and dependencies don't change frequently

7. useRef Hook
   - Purpose: Access DOM elements or store mutable values that don't cause re-renders
   - Use Case: Focus management, text selection, media playback, storing previous values
   - Example: const inputRef = useRef(null); <input ref={inputRef} />
   - When to Use: Direct DOM access, managing focus, storing non-rendering state

8. useLayoutEffect Hook
   - Purpose: Synchronous effect hook that runs before DOM mutations are painted
   - Use Case: DOM measurements, animations, layout calculations
   - Example: useLayoutEffect(() => { /* runs before browser paint */ }, []);
   - When to Use: When you need to measure or manipulate DOM before visual updates

9. useImperativeHandle Hook
   - Purpose: Customize instance value exposed to parent via ref
   - Use Case: Creating flexible component APIs, exposing specific methods
   - Example: useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus() }));
   - When to Use: Building reusable components with controlled imperative APIs

10. Custom Hooks
    - Purpose: Reuse stateful logic across multiple components
    - Use Case: Shared logic like form handling, data fetching, authentication
    - Example: const useCustomForm = () => { /* custom logic */ return { values, handleChange } };
    - When to Use: When multiple components need the same stateful logic

