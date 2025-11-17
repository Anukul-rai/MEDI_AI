import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import PredictDisease from "./pages/PredictDisease";
import Appointments from "./pages/Appointment";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from '@auth0/auth0-react';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 🌐 PublicRoute Component
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        {/* Protected routes */}
        <Route
          path="/predict"
          element={
            <ProtectedRoute>
              <PredictDisease />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
