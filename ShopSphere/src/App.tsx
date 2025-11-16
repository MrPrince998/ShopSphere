import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
