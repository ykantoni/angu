import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import type {JSX} from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const auth = useAuth();
    if (!auth.accessToken) {
        return <Navigate to="/login" replace />;
    }
    return children;
}