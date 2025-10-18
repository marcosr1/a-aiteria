"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha }),
  });

  const data = await res.json();
  if (data.success) {
    router.push("/dashboard");
  } else {
    toast.error(data.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-purple-700 text-center">
          Login
        </h1>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 rounded-xl border border-purple-200 mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white p-3 rounded-xl font-bold hover:bg-purple-700 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
