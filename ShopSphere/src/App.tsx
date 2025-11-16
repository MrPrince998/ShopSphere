import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import ForgotPasswordPage from "./pages/auth/reset-password";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;
