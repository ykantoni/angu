import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
    return (
        <div style={{ padding: 20 }}>
            <nav style={{ marginBottom: 20 }}>
                <Link to="/">Dashboard</Link> | <Link to="/login">Login</Link>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}