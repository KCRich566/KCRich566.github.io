[import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import?utm_source=chatgpt.com)

# React Learn

## 🧠 What is React

**React** is a JavaScript library for building user interfaces (UI), especially for single-page applications (SPA).

It is developed and maintained by Meta (formerly Facebook) and is widely used in modern front-end development.

---

## ⚙️ Core Concepts

### Component (Component-based Architecture)

React breaks the UI into reusable, independent components.

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```
Benefits:
 - Reusable
 - Maintainable
 - Scalable structure

## Declarative UI

You describe what the UI should look like, not how to update it.
```js
return isLogin ? <Dashboard /> : <Login />;
```

React automatically updates the DOM when state changes.

### State-driven

The UI updates automatically based on state changes.

```js
const [count, setCount] = useState(0);
```

### Virtual DOM

React uses a Virtual DOM to improve performance:

Computes differences in memory (diffing)
Minimizes updates to the real DOM

### JSX (Syntax Feature)

React uses JSX (JavaScript XML) to describe UI:

```js
const element = <h1>Hello</h1>;
```

JSX is compiled into JavaScript:
```js
React.createElement("h1", null, "Hello");
```

## Data Flow

React uses one-way data binding:

```
Parent → Child (via props)
```

Benefits:

- Predictable
- Easier debugging

## Why React

### Pros
Component-based architecture
High performance (Virtual DOM)
Large ecosystem
Scalable for large applications
### Cons
Requires understanding of tooling (Vite, Webpack)
Ecosystem complexity (many choices)


## 
### main.jsx 

This is the entry point of a React application and creates the root React component.

The `ReactDOM.createRoot()` method is used to create a React root for the DOM element passed to it.

The `render()` method is then called on the root to render the `App` component into the DOM.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
```

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
👉 它負責：

掛載 React
注入 App
初始化全域環境

👉 特性：

越乾淨越好
不放業務邏輯

### App.jsx

This is Main application component: defines routing structure and renders page components based on URL paths.

It provides the `export default function App()` to define the main routing logic, which handles locale-based routing using `react-router-dom` for navigation.
```js
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:locale/*" element={<LocaleApp />} />
      <Route path="*" element={<Navigate to="/en" replace />} />
    </Routes>
  );
}
```

## ⚙️ What is Hooks

**React Hooks** are special functions that let you use React features (like state and lifecycle) inside function components.

They were introduced in React 16.8.

---

### 🔹 Common Hooks

```jsx
import { useState, useEffect } from "react";
1️⃣ useState

Used to manage local state.

const [count, setCount] = useState(0);
2️⃣ useEffect

Used for side effects (API calls, subscriptions, etc.)

useEffect(() => {
  console.log("Component mounted");
}, []);
🧠 Key Rule
Hooks can only be used inside:
Function components
Custom hooks
🧩 What is JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code inside JavaScript.

🔹 Example
const element = <h1>Hello React</h1>;
🔹 JSX is compiled into JavaScript
React.createElement("h1", null, "Hello React");
🧠 Key Idea

JSX is NOT HTML
It is syntactic sugar for JavaScript function calls.

🚦 react-router-dom

A library used for handling routing in React applications.

📌 Routes

Defines all route mappings in the app.
Route是誰先匹配就先選誰
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  // /:locale:表示可變值(變數)
  // /*表示可以再接其他路由
  <Route path="/:locale/*" element={<LocaleApp />} />
  // replace 表示不保留history
  <Route path="*" element={<Navigate to="/en" replace />} />

</Routes>

👉 Think of it as: route container

📌 Route

Defines a single route.

<Route path="/about" element={<About />} />

👉 Maps URL → Component

📌 Navigate

Used for programmatic navigation (redirect)

import { Navigate } from "react-router-dom";

return <Navigate to="/login" />;

👉 Used for:

redirect after login
guard routes
📌 useParams

Used to get URL parameters.

import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
🔹 Example Route
<Route path="/user/:id" element={<User />} />

URL:

/user/123

Result:

User ID: 123
🧠 Summary
Hooks → manage state & lifecycle
JSX → UI syntax inside JS
react-router-dom → navigation system
Routes → container
Route → mapping
Navigate → redirect
useParams → read URL params



Link
useLocation, 
useNavigate 