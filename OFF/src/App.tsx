import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/signup/Signup";
import { Login } from "./components/login/Login";
import { Trems } from "./components/terms/Terms";
import { Dashboard } from "./components/dashboard/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./Redux/hooks";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
function App() {
  const tokens = useAppSelector((state) => state.token);
  const loading = useAppSelector((state) => state.loading);
  const token = tokens?.accessToken;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!token ? <Signup /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={
              !loading && (token ? <Dashboard /> : <Navigate to="/login" />)
            }
          />
          <Route
            path="/"
            element={!token ? <Trems /> : <Navigate to="/dashboard" />}
          />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
