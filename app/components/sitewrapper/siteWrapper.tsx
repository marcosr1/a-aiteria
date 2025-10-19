"use client";
import { useEffect, useState } from "react";

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const [aberto, setAberto] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/status");
        if (!res.ok) throw new Error("Erro na API");

        const data = await res.json();
        setAberto(data.aberto);
      } catch (err) {
        console.error("Erro ao buscar status:", err);
        setAberto(false);
      }
    }

    fetchStatus();
  }, []);

  if (aberto === null) return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Carregando...</p>
    </div>
  );

  if (!aberto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-100 text-purple-800 text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Estamos fechados 😔</h1>
        <p>Nosso estabelecimento não está funcionando no momento. Volte mais tarde!</p>
      </div>
    );
  }

  return <>{children}</>;
}
