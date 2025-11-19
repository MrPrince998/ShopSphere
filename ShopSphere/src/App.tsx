import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import ForgotPasswordPage from "./pages/auth/reset-password";
import NotFoundPage from "./components/const/404-error";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />


      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
}

export default App;
