import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthProvider";

export default function Dashboard() {
    const [message, setMessage] = useState<string>("");
    const auth = useAuth();

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const res = await api.get("/allusers");
                if (mounted) setMessage(res.data.message || "Protected data loaded");
            } catch {
                if (mounted) setMessage("Failed to load protected data");
            }
        }
        load();
        return () => { mounted = false; };
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
            <button onClick={() => auth.signout()}>Logout</button>
        </div>
    );
}