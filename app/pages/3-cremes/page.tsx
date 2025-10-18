"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { usePedido } from "../../context/PedidoContext";
import { useRouter } from "next/navigation";

interface Cremes {
  id: number;
  nome: string;
  ativo: boolean;
}

export default function CremesPage() {
  const router = useRouter();  
  const { pedido, setPedido } = usePedido();
  const [cremes, setCremes] = useState<Cremes[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCremes() {
    try {
      const res = await fetch("/api/cremes");
      if (!res.ok) throw new Error("Erro ao carregar os cremes");
      const data: Cremes[] = await res.json();
      setCremes(data.filter((c: Cremes) => c.ativo));
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível carregar os cremes!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCremes();
  }, []);

  function toggleCreme(nome: string) {
  if (pedido.cremes.includes(nome)) {
    setPedido({
      ...pedido,
      cremes: pedido.cremes.filter((c) => c !== nome),
    });
  } else {
    if (pedido.cremes.length >= 2) {
      toast.error("Você só pode selecionar no máximo 2 cremes!");
      return;
    }
    setPedido({
      ...pedido,
      cremes: [...pedido.cremes, nome],
    });
  }
}



  function handleNext() {
    router.push("/pages/4-frutas");
  }

  if (loading) {
    return <div className="p-4 text-center text-purple-300">Carregando cremes...</div>;
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-gradient-to-b from-purple-500 to-white">
      <h1 className="text-2xl font-bold mb-8 text-purple-800">Escolha até 2 cremes</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl ">
        {cremes.map((c) => (
          <button key={c.nome} onClick={() => toggleCreme(c.nome)} className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all
              ${pedido.cremes.includes(c.nome)
                ? "border-purple-100 bg-purple-500"
                : "border-purple-600 bg-white hover:border-purple-200 hover:bg-purple-300 "}`}
          >
            <span className="font-semibold text-gray-800">{c.nome}</span>
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
