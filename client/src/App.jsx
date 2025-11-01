import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import ForgotPassword from "./pages/Auth/ForgetPassword";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/Dashboard/LandingPage";
import ProfilePage from './pages/Dashboard/ProfilePage'
import AuthGuard from "./hooks/AuthGuard"

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected */}
          <Route path="/dashboard" element={<AuthGuard><Home /></AuthGuard>} />
          <Route path="/income" element={<AuthGuard><Income /></AuthGuard>} />
          <Route path="/expense" element={<AuthGuard><Expense /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
        </Routes>
      </Router>

      <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;
