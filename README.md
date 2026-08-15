# React.js Core Concepts & Implementation Guide

A comprehensive reference guide for building production-ready functional React architectures with step-by-step examples.

---

## 📋 Table of Contents

1. [Quick Start & Project Setup](#quick-start--project-setup)
2. [Creating Components](#creating-components)
3. [Working with Props](#working-with-props)
4. [React Hooks](#react-hooks)
5. [Context API](#context-api)
6. [Handling Forms](#handling-forms)
7. [React Router](#react-router)
8. [Redux Toolkit (RTK)](#redux-toolkit-rtk-implementation)
9. [Advanced Concepts](#advanced-concepts)

---

## Quick Start & Project Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn package manager

### Step 1: Create a React Project with Vite
```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

### Step 2: Project Structure
```
my-react-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Card.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

### Step 3: Run Your Application
```bash
npm run dev
# Opens at http://localhost:5173/
```

### Step 4: Build for Production
```bash
npm run build
npm run preview
```

---
## Creating Components

Components are isolated, reusable building blocks of a React application. This guide focuses entirely on **Functional Components**, which are simpler and more modern than class components.

### What is a Component?
A component is a JavaScript function that returns JSX (HTML-like syntax). It can:
- Accept props (input data)
- Manage internal state
- Handle events
- Return UI

### Simple Functional Component Example

**Step 1: Create a basic component file**

```jsx
// src/components/WelcomeCard.jsx
import React from 'react';

export default function WelcomeCard() {
  return (
    <div className="card">
      <h2>Welcome to the React Guide!</h2>
      <p>This is a functional component.</p>
    </div>
  );
}
```

**Step 2: Use the component in your app**

```jsx
// src/App.jsx
import WelcomeCard from './components/WelcomeCard';

function App() {
  return (
    <div className="container">
      <WelcomeCard />
      <WelcomeCard />
    </div>
  );
}

export default App;
```

### Component with JSX Rules
- Only one root element per component
- Use className instead of class
- Use camelCase for attributes (onClick, onSubmit)
- Close self-closing tags (like `<img />`)

```jsx
// ✅ Correct
export function Card() {
  return (
    <div>
      <h1>Card Title</h1>
      <p>Card content</p>
    </div>
  );
}

// ❌ Wrong - multiple root elements
export function Card() {
  return (
    <h1>Card Title</h1>
    <p>Card content</p>
  );
}
```

---
## Working with Props

**Props** (properties) are how parent components pass data to child components. They are **read-only** and flow downward in React applications.

### Understanding Props

- Props are like function parameters
- Parent component → Child component (one-way data flow)
- Props cannot be modified inside child component
- Changes to props trigger re-render

### Basic Props Example

**Step 1: Create a child component that receives props**

```jsx
// src/components/UserProfile.jsx
export function UserProfile({ username, age, isLoggedIn }) {
  return (
    <div className="user-profile">
      <h3>User: {username}</h3>
      <p>Age: {age}</p>
      <p>Status: {isLoggedIn ? 'Active' : 'Offline'}</p>
    </div>
  );
}
```

**Step 2: Use the component with props in parent**

```jsx
// src/App.jsx
import { UserProfile } from './components/UserProfile';

function App() {
  return (
    <div>
      <UserProfile username="Alex" age={28} isLoggedIn={true} />
      <UserProfile username="Sarah" age={25} isLoggedIn={false} />
      <UserProfile username="Mike" age={30} isLoggedIn={true} />
    </div>
  );
}

export default App;
```

### Props with Default Values

```jsx
// src/components/Button.jsx
export function Button({ label = 'Click me', color = 'blue', onClick }) {
  return (
    <button 
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Usage
<Button label="Submit" color="green" onClick={() => alert('Clicked!')} />
<Button /> // Uses default values
```

### Props Best Practices

```jsx
// ❌ Don't modify props
function BadComponent(props) {
  props.name = 'New Name'; // DON'T DO THIS
  return <p>{props.name}</p>;
}

// ✅ Do use props as read-only
function GoodComponent({ name, onUpdate }) {
  return (
    <div>
      <p>{name}</p>
      <button onClick={() => onUpdate('New Name')}>Update</button>
    </div>
  );
}
```

---
Page 1 of 5
## React Hooks

Hooks are functions that let you use React features in functional components. They start with `use`.

### 1. useState Hook - State Management

**Purpose:** Add state to functional components  
**Use Case:** Form inputs, counters, toggles, any data that changes

**Step-by-Step Implementation:**

```jsx
// Step 1: Import useState
import { useState } from 'react';

// Step 2: Create component
export function Counter() {
  // useState returns [currentValue, updateFunction]
  const [count, setCount] = useState(0); // Initial value is 0
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

**Multiple State Variables:**

```jsx
import { useState } from 'react';

export function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <input 
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Enter age"
      />
      <button onClick={() => console.log({ name, email, age })}>
        Submit
      </button>
    </div>
  );
}
```

---

### 2. useEffect Hook - Side Effects

**Purpose:** Handle side effects (API calls, subscriptions, DOM changes)  
**Use Case:** Data fetching, timers, event listeners, cleanup

**Step-by-Step Implementation:**

```jsx
import { useState, useEffect } from 'react';

export function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs once when component mounts (empty dependency array)
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array = run once

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

**useEffect with Dependencies:**

```jsx
import { useState, useEffect } from 'react';

export function SearchUsers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Runs whenever 'query' changes
  useEffect(() => {
    if (query.length > 0) {
      fetch(`https://api.example.com/search?q=${query}`)
        .then(res => res.json())
        .then(data => setResults(data));
    } else {
      setResults([]);
    }
  }, [query]); // Dependency array - re-run when query changes

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Cleanup Function:**

```jsx
import { useEffect, useState } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set up interval
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, []); // Only run once

  return <p>Time: {seconds}s</p>;
}
```

---

### 3. Other Important Hooks

**useContext** - Access context values  
**useReducer** - Complex state logic  
**useCallback** - Memoize functions  
**useMemo** - Memoize values  
**useRef** - Access DOM elements  

---
## Context API

**Purpose:** Share data across components without prop drilling  
**Use Case:** Global state like theme, authentication, user preferences

### Understanding Context API

- Avoids passing props through many levels
- Centralized state management
- Consumer components automatically re-render when context changes

### Step-by-Step Implementation

**Step 1: Create the Context**

```jsx
// src/context/ThemeContext.jsx
import { createContext, useState, useContext } from 'react';

// Step 1a: Create context
const ThemeContext = createContext();

// Step 1b: Create Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 1c: Custom hook to use context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

**Step 2: Wrap your app with Provider**

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

**Step 3: Use the context in components**

```jsx
// src/components/Header.jsx
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{
      background: theme === 'light' ? 'white' : '#333',
      color: theme === 'light' ? 'black' : 'white'
    }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Current Theme: {theme}
      </button>
    </header>
  );
}

// src/components/Main.jsx
import { useTheme } from '../context/ThemeContext';

export function Main() {
  const { theme } = useTheme();

  return (
    <main style={{
      background: theme === 'light' ? '#f5f5f5' : '#222',
      color: theme === 'light' ? 'black' : 'white'
    }}>
      <p>Main content with {theme} theme</p>
    </main>
  );
}
```

**Step 4: Use in App**

```jsx
// src/App.jsx
import { Header } from './components/Header';
import { Main } from './components/Main';

function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App;
```

### Multiple Contexts Example

```jsx
// src/context/UserContext.jsx
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
```

---
React.js Core Concepts & Implementation Guide
Page 2 of 5
## Handling Forms

**Purpose:** Capture and manage user input  
**Common Approaches:** Controlled components, uncontrolled components, form libraries

### Controlled Components Approach

In controlled components, React state is the "single source of truth" for form values.

**Step 1: Create a simple login form**

```jsx
// src/components/LoginForm.jsx
import { useState } from 'react';

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Submitted Data:', formData);
    // Here you would send data to server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
```

**Step 2: Form with Validation**

```jsx
import { useState } from 'react';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    terms: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.terms) newErrors.terms = 'You must agree to terms';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid. Submitting:', formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        gender: '',
        terms: false
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
      </div>

      <div>
        <label htmlFor="gender">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
      </div>

      <div>
        <input
          id="terms"
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
        />
        <label htmlFor="terms">I agree to terms and conditions</label>
        {errors.terms && <span style={{ color: 'red' }}>{errors.terms}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

---
## React Router

**Purpose:** Create single-page applications with multiple pages/views  
**Installation:** `npm install react-router-dom`  
**Version:** v6+ (latest)

### Step-by-Step Implementation

**Step 1: Install React Router**

```bash
npm install react-router-dom
```

**Step 2: Create page components**

```jsx
// src/pages/Home.jsx
export function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
    </div>
  );
}

// src/pages/About.jsx
export function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>Learn more about us</p>
    </div>
  );
}

// src/pages/Contact.jsx
export function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>Get in touch with us</p>
    </div>
  );
}

// src/pages/NotFound.jsx
export function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
```

**Step 3: Setup routing in App.jsx**

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navigation */}
        <nav style={{ background: '#333', padding: '1rem', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
          <Link to="/about" style={{ color: 'white', marginRight: '1rem' }}>About</Link>
          <Link to="/contact" style={{ color: 'white', marginRight: '1rem' }}>Contact</Link>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### Dynamic Routes with URL Parameters

```jsx
// src/pages/UserProfile.jsx
import { useParams } from 'react-router-dom';

export function UserProfile() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}

// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { UserProfile } from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Navigation Programmatically

```jsx
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After successful login
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---
React.js Core Concepts & Implementation Guide
Page 3 of 5
## Redux Toolkit (RTK) Implementation

**Purpose:** Centralized state management for complex applications  
**Installation:** `npm install @reduxjs/toolkit react-redux`  
**Benefits:** Predictable state updates, easier debugging, better performance

### Complete Step-by-Step Implementation

**Step 1: Install Redux Toolkit**

```bash
npm install @reduxjs/toolkit react-redux
```

**Step 2: Create a Slice (Combined reducer + actions)**

```jsx
// src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    history: []
  },
  reducers: {
    // Action: increment
    increment: (state) => {
      state.value += 1;
      state.history.push(state.value);
    },
    // Action: decrement
    decrement: (state) => {
      state.value -= 1;
      state.history.push(state.value);
    },
    // Action: increment by amount
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    // Action: reset
    reset: (state) => {
      state.value = 0;
      state.history = [];
    }
  }
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

**Step 3: Create another slice for users**

```jsx
// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setUser, setUsers, addUser, removeUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
```

**Step 4: Configure the Redux Store**

```jsx
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
});

export default store;
```

**Step 5: Provide the store to your app**

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

**Step 6: Create components that use Redux**

```jsx
// src/components/CounterComponent.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

export function CounterComponent() {
  // Get state from Redux
  const count = useSelector((state) => state.counter.value);
  const history = useSelector((state) => state.counter.history);
  
  // Get dispatch function
  const dispatch = useDispatch();

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Counter: {count}</h2>
      
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>

      <h3>History:</h3>
      <p>{history.join(' → ')}</p>
    </div>
  );
}
```

```jsx
// src/components/UserComponent.jsx
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser, setUsers } from '../store/userSlice';

export function UserComponent() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);
  
  const dispatch = useDispatch();

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`
    };
    dispatch(addUser(newUser));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Users Manager</h2>
      
      <button onClick={handleAddUser}>Add User</button>

      <h3>Users List:</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => dispatch(removeUser(user.id))}>Delete</button>
          </li>
        ))}
      </ul>

      {users.length === 0 && <p>No users yet</p>}
    </div>
  );
}
```

**Step 7: Use components in App**

```jsx
// src/App.jsx
import { CounterComponent } from './components/CounterComponent';
import { UserComponent } from './components/UserComponent';

function App() {
  return (
    <div>
      <h1>Redux Toolkit Demo</h1>
      <CounterComponent />
      <UserComponent />
    </div>
  );
}

export default App;
```

### Redux DevTools

Redux Toolkit automatically includes Redux DevTools support. Install the browser extension to inspect state changes:
1. Install "Redux DevTools" extension in Chrome
2. Open DevTools → Redux tab
3. See all actions and state changes in real-time

---
return (
<div>
<h1>Count: {count}</h1>
<button onClick={() => dispatch(increment())}>+</button>
<button onClick={() => dispatch(decrement())}>-</button>
</div>
);
}
## Advanced Concepts

### 1. React.memo - Prevent Unnecessary Re-renders

**Purpose:** Memoize functional components to prevent re-renders when props don't change

```jsx
import { memo } from 'react';

// Without memo - re-renders whenever parent re-renders
function UserCard({ name, email }) {
  console.log('UserCard rendered');
  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
}

// With memo - only re-renders if props change
export const MemoizedUserCard = memo(UserCard);

// Usage
function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        Counter: {counter}
      </button>
      {/* MemoizedUserCard only re-renders if name or email changes */}
      <MemoizedUserCard name="John" email="john@example.com" />
    </div>
  );
}
```

---

### 2. useMemo - Memoize Expensive Computations

**Purpose:** Cache computed values to avoid expensive recalculations

```jsx
import { useState, useMemo } from 'react';

export function DataProcessor() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(1);

  // Expensive calculation - only runs when multiplier changes
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return numbers
      .map(n => n * multiplier)
      .filter(n => n > 5)
      .reduce((sum, n) => sum + n, 0);
  }, [multiplier]); // Only depends on multiplier

  return (
    <div>
      <p>Result: {processedData}</p>
      <button onClick={() => setMultiplier(multiplier + 1)}>
        Multiplier: {multiplier}
      </button>
      <button onClick={() => setNumbers([...numbers, Math.random()])}>
        Add Number
      </button>
    </div>
  );
}
```

---

### 3. useCallback - Memoize Callback Functions

**Purpose:** Prevent function recreation on every render, useful for performance optimization

```jsx
import { useCallback, memo, useState } from 'react';

// Child component - only re-renders if onClick changes
const Button = memo(({ label, onClick }) => {
  console.log(`Button ${label} rendered`);
  return <button onClick={onClick}>{label}</button>;
});

export function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Without useCallback - handleClick recreated on every render
  // With useCallback - only recreated when count changes
  const handleClick = useCallback(() => {
    console.log('Clicked with count:', count);
  }, [count]);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type name"
      />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* Button only re-renders when handleClick changes */}
      <Button label="Click Me" onClick={handleClick} />
    </div>
  );
}
```

---

### 4. Portals - Render Outside Parent DOM

**Purpose:** Render components into a different part of the DOM tree

```jsx
import { createPortal } from 'react-dom';

// src/components/Modal.jsx
export function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px'
      }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body // Render into body, not into parent
  );
}

// Usage
export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is rendered outside the parent DOM tree</p>
      </Modal>
    </div>
  );
}
```

---

### 5. Error Boundaries - Catch Component Errors

**Purpose:** Catch JavaScript errors in component tree and display fallback UI

```jsx
import { Component } from 'react';

// Must be a class component
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#f8d7da' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
export function App() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

---

### Performance Best Practices

1. **Use React DevTools Profiler** - Identify slow components
2. **Lazy load components** - `const Home = lazy(() => import('./pages/Home'))`
3. **Code splitting** - Split bundle by routes
4. **Optimize dependencies** - Use proper dependency arrays in hooks
5. **Avoid inline objects/functions** - Define outside components
6. **Use keys properly** - Essential for list rendering

---

## 🚀 Quick Reference

| Concept | Use When |
|---------|----------|
| **useState** | Need component state |
| **useEffect** | Side effects, data fetching |
| **useContext** | Global state, avoid prop drilling |
| **useReducer** | Complex state logic |
| **useCallback** | Passing callbacks to memoized components |
| **useMemo** | Expensive computations |
| **useRef** | DOM access, non-rendering state |
| **React.memo** | Prevent re-renders on prop change |
| **Redux** | Large apps with complex state |
| **Router** | Multi-page applications |

---

## 📚 Additional Resources

- [React Official Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [React Hooks Best Practices](https://react.dev/reference/react/hooks)

---

**Happy Learning! 🎉**