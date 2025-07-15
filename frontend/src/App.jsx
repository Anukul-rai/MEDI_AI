import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import PredictDisease from "./pages/PredictDisease";
import Appointments from "./pages/Appointment";
import Articles from "./pages/Articles";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth, AuthProvider } from "./context/AuthContext";

function App() {
    const { loggedIn } = useAuth();

    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
            path="/login"
            element={loggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
            path="/signup"
            element={loggedIn ? <Navigate to="/" /> : <Signup />}
            />
            <Route
            path="/predict"
            element={loggedIn ? <PredictDisease /> : <Navigate to="/login" />}
            />
            <Route
            path="/book"
            element={loggedIn ? <Appointments /> : <Navigate to="/login" />}
            />
            <Route
            path="/article"
            element={loggedIn ? <Articles /> : <Navigate to="/login" />}
            />
            <Route
            path="/profile"
            element={loggedIn ? <Profile /> : <Navigate to="/login" /> }
            />
        </Routes>
        <ToastContainer />
        </>
    );
}

export default function AppWrapper() {
    return (
        <AuthProvider>
        <App />
        </AuthProvider>
    );
}
