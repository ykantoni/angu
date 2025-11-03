import api from "./axios";

export type LoginResponse = { accessToken: string };

export async function login(username: string, password: string): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/login", { username, password });
    return res.data;
}

export async function logout() {
    await api.post("/logout"); // backend should clear refresh cookie
}