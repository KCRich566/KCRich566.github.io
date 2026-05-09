# React Learn

## 🔗 Reference
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

---

## 🧠 What is React

**React** is a JavaScript library for building user interfaces (UI), especially for single-page applications (SPA).

It is developed and maintained by Meta (formerly Facebook) and is widely used in modern front-end development.

---

## ⚙️ Core Concepts

### 🧩 Component (Component-based Architecture)

React breaks the UI into reusable, independent components.

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

**Benefits:**
- Reusable
- Maintainable
- Scalable structure

---

### 🎯 Declarative UI

You describe what the UI should look like, not how to update it.

```js
return isLogin ? <Dashboard /> : <Login />;
```

React automatically updates the DOM when state changes.

---

### 🔄 State-driven

The UI updates automatically based on state changes.

```js
const [count, setCount] = useState(0);
```

---

### ⚡ Virtual DOM

React uses a Virtual DOM to improve performance:

- Computes differences in memory (diffing)
- Minimizes updates to the real DOM

---

### 🧪 JSX (Syntax Feature)

JSX (JavaScript XML) is used to describe UI:

```js
const element = <h1>Hello</h1>;
```

Compiled into:

```js
React.createElement("h1", null, "Hello");
```

> JSX is NOT HTML, it's syntactic sugar for JavaScript.

---

## 🔄 Data Flow

React uses one-way data binding:

```
Parent → Child (via props)
```

**Benefits:**
- Predictable
- Easier debugging

---

## 🚀 Why React

### ✅ Pros
- Component-based architecture
- High performance (Virtual DOM)
- Large ecosystem
- Scalable for large applications

### ❌ Cons
- Requires understanding of tooling (Vite, Webpack)
- Ecosystem complexity

---

## 📁 Project Structure

### main.jsx

Entry point of a React application.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Responsibilities:**
- Mount React
- Inject App
- Initialize global environment

**Best Practice:**
- Keep it clean
- Avoid business logic

---

### App.jsx

Main application component (routing logic).

```jsx
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

---

## ⚙️ React Hooks

Hooks are functions that let you use React features inside function components.

Introduced in React 16.8.

### 🔹 Common Hooks

#### 1️⃣ useState

```js
const [count, setCount] = useState(0);
```

Used to manage local state.

---

#### 2️⃣ useEffect

解釋

```js
useEffect(() => {
  console.log("Component mounted");
}, []);
```

Used for side effects (API calls, subscriptions, etc.)

---
### useMemo


### 🧠 Rules of Hooks

Hooks can only be used inside:
- Function components
- Custom hooks

---

## 🧩 JSX Summary

```js
const element = <h1>Hello React</h1>;
```

Compiled into:

```js
React.createElement("h1", null, "Hello React");
```

---

## 🚦 react-router-dom

Library for handling routing in React applications.

### 📌 Routes

Container for all routes.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/:locale/*" element={<LocaleApp />} />
  <Route path="*" element={<Navigate to="/en" replace />} />
</Routes>
```

---

### 📌 Route

Maps URL → Component

```jsx
<Route path="/about" element={<About />} />
```

---

### 📌 Navigate

Used for redirects

```jsx
return <Navigate to="/login" />;
```

---

### 📌 useParams

Get URL parameters

```jsx
function User() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
```

Example:

```
/user/123 → User ID: 123
```

---

### 🔗 Link

```jsx
import { Link } from "react-router-dom";
<Link to="/about">Go to About</Link>
```

- 不刷新頁面
- SPA 導航

---

### 📍 useLocation

```jsx
const location = useLocation();
```

```js
{
  pathname: "/about",
  search: "?id=123"
}
```

---

### 🚀 useNavigate

```jsx
const navigate = useNavigate();
navigate("/dashboard");
```

```js
navigate("/login", { replace: true });
navigate(-1);
```

---

## 🧠 Summary

- Hooks → manage state & lifecycle  
- JSX → UI syntax inside JS  
- react-router-dom → navigation system  

| Concept | Description |
|--------|------------|
| Routes | Container |
| Route | Mapping |
| Navigate | Redirect |
| useParams | Read URL params |

---

## 📦 js-yaml

### ✅ What is js-yaml

A JavaScript library used to:

- Parse YAML → JavaScript object  
- Convert JS → YAML  

---

### ✅ Markdown Front Matter

```md
---
title: 我的文章
date: 2026-05-09
tags:
  - js
  - yaml
---
```

The section between `---` is YAML.

---

### ✅ Parse Front Matter with js-yaml

```js
import yaml from 'js-yaml';

const md = `---
title: 我的文章
date: 2026-05-09
tags:
  - js
  - yaml
---

# Hello World
`;

const match = md.match(/^---\n([\s\S]*?)\n---/);

if (match) {
  const yamlContent = match[1];
  const data = yaml.load(yamlContent);
  console.log(data);
}
```

### 🧾 Output

```js
{
  title: '我的文章',
  date: '2026-05-09',
  tags: ['js', 'yaml']
}
```

---

## ✅ Conclusion

- `js-yaml` can parse Markdown Front Matter  
- It only handles YAML (you must extract it manually)  
- For convenience, consider using `gray-matter`


## 每次更換頁面的執行順序
main.jsx -> App.jsx -> 