// main.jsx
// Application entry point: sets up React, routing, and global providers. 
// Renders the App component into the root DOM element.

// React and ReactDOM are the core libraries for building and rendering React applications.
import React from "react";
// ReactDOM is used to render the React application into the DOM.
import ReactDOM from "react-dom/client";
// BrowserRouter is used for client-side routing in React applications.
import { BrowserRouter } from "react-router-dom";
// HelmetProvider is used for managing document head (meta tags, title) for SEO purposes.
import { HelmetProvider } from "react-helmet-async";
// App is the main application component that defines the routing structure and renders page components based on URL paths.
import App from "./App";
// Importing global CSS styles for the application.
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode is a tool for highlighting potential problems in an application. 
  // It activates additional checks and warnings for its descendants.
  // like identifying components with unsafe lifecycle methods, 
  // legacy API usage, and other potential issues.

  // What does BrowserRouter do?
  // It:
  // - Listens for URL changes
  // - Manages the History API
  // - Provides Router Context
  // - Notifies Routes to update
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
