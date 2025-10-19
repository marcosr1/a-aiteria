"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { usePedido } from "../../context/PedidoContext";
import { useRouter } from "next/navigation";

interface Frutas {
  id: number;
  nome: string;
  ativo: boolean;
}

export default function FrutasPage() {
  const router = useRouter();  
  const { pedido, setPedido } = usePedido();
  const [frutas, setFrutas] = useState<Frutas[]>([]);
  const [loading, setLoading] = useState(true);


  async function fetchFrutas() {
    try {
      const res = await fetch("/api/frutas");
      if (!res.ok) throw new Error("Erro ao carregar as frutas");
      const data: Frutas[] = await res.json();
      setFrutas(data.filter((f) => f.ativo));
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível carregar as frutas!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFrutas();
  }, []);

function toggleFruta(nome: string) {
  if (pedido.frutas.includes(nome)) {
    setPedido({
      ...pedido,
      frutas: pedido.frutas.filter((f) => f !== nome),
    });
    return;
  }

  if (pedido.frutas.length >= 2) {
    toast.error("Você só pode selecionar até 2 frutas!");
    return;
  }

  setPedido({
    ...pedido,
    frutas: [...pedido.frutas, nome],
  });
}

  function handleNext() {
    router.push("/pages/5-complementos");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-700 font-semibold">
        Carregando Frutas...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gradient-to-b from-purple-500 to-white">
      <h1 className="text-2xl font-bold mb-8 text-purple-800">Escolha suas frutas</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {frutas.map((f) => (
          <button
            key={f.nome}
            onClick={() => toggleFruta(f.nome)}
            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all
              ${pedido.frutas.includes(f.nome)
                ? "border-purple-100 bg-purple-500"
                : "border-purple-600 bg-white hover:border-purple-200 hover:bg-purple-300"}`}
          >
            <span className="font-semibold text-gray-800">{f.nome}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="px-6 py-2 rounded border-2 border-purple-600 bg-white text-black hover:bg-purple-300 hover:border-purple-100"
          onClick={() => router.back()}>
          Voltar
        </button>
        <button
          onClick={handleNext}
          className="bg-purple-600 hover:bg-purple-900 text-white px-8 py-3 rounded-lg text-lg font-semibold">
          Próximo
        </button>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: { fontSize: "14px" },
        }}
      />
    </div>
  );
}
