import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Login() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await auth.signin(username, password);
            navigate("/");
        } catch (e: any) {
            setErr(e.response?.data?.message || "Login failed");
        }
    }

    return (
        <div style={{ maxWidth: 420 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div style={{ marginTop: 8 }}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}
                <button type="submit" style={{ marginTop: 12 }}>Sign in</button>
            </form>
        </div>
    );
}