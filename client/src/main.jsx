import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-context/index.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";
import StudentProvider from "./context/student-context/index.jsx";
import { CartProvider } from "./context/cart-context/index.jsx";
import { ThemeProvider } from "./context/theme-context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <InstructorProvider>
          <StudentProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </StudentProvider>
        </InstructorProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
