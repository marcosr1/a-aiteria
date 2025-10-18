"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Item {
  id: number;
  nome: string;
  ativo: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [aba, setAba] = useState("cobertura");
  const [itens, setItens] = useState<Item[]>([]);
  const categorias = [
    "cobertura",
    "cremes",
    "frutas",
    "complementos",
    "complementosPremium",
  ];

  useEffect(() => {
    const verificar = async () => {
      const res = await fetch("/api/verificar");
      if (!res.ok) router.push("/dashboard/login");
    };
    verificar();
  }, [router]);

  const verificarAutenticacao = useCallback(async () => {
  try {
    const res = await fetch("/api/verificar", { method: "GET" });
    if (!res.ok) {
      router.push("/dashboard/login");
    } else {
      carregarItens(aba);
    }
  } catch {
    router.push("/dashboard/login");
  }
}, [router, aba]);


  useEffect(() => {
    verificarAutenticacao();
  }, [verificarAutenticacao]);

  async function carregarItens(tipo: string) {
    try {
      const res = await fetch(`/api/${tipo}`);
      const data = await res.json();
      setItens(data);
    } catch (e) {
      console.error("Erro ao carregar itens:", e);
    }
  }

  async function alternarAtivo(tipo: string, nome: string, ativo: boolean) {
  try {
    await fetch(`/api/${tipo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, ativo: !ativo }),
    });

    carregarItens(tipo);
  } catch (e) {
    console.error("Erro ao atualizar item:", e);
  }
}
  function logout() {
    localStorage.removeItem("logado");
    router.push("/dashboard/login");
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">
          Painel de Controle – Açaiteria 🍧
        </h1>
        <button
          onClick={logout}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
          Sair
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setAba(cat)}
            className={`px-4 py-2 rounded font-semibold ${
              aba === cat
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border border-purple-300 hover:bg-purple-100"}`}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto bg-white border-gray-500 p-6 rounded-2xl shadow-lg">
        {itens.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhum item encontrado.</p>
        ) : (
          itens.map((item, index) => (
            <div
              key={item.id || index}
              className="flex justify-between items-center border-b py-3">
              <p className="font-semibold text-purple-500">{item.nome}</p>
              <button
                onClick={() => alternarAtivo(aba, item.nome, item.ativo)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  item.ativo
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-red-500 text-white hover:bg-red-600"}`}>
                {item.ativo ? "Ativo" : "Inativo"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
