"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePedido } from "../../context/PedidoContext";
import toast, { Toaster } from "react-hot-toast";

type Cobertura = {
  id: number;
  nome: string;
  ativo: boolean;
};

export default function CoberturasPage() {
  const router = useRouter();
  const { pedido, setPedido } = usePedido();
  const [coberturas, setCoberturas] = useState<Cobertura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCoberturas() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coberturas/`);
        if (!res.ok) throw new Error("Erro ao carregar coberturas");
        const data = await res.json();
        setCoberturas(data.filter((c: Cobertura) => c.ativo));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarCoberturas();
  }, []);

  function toggleCobertura(nome: string) {
  if (pedido.cobertura.includes(nome)) {
    setPedido({
      ...pedido,
      cobertura: pedido.cobertura.filter((c) => c !== nome),
    });
  } else {
    if (pedido.cobertura.length >= 2) {
      toast.error("Você só pode selecionar no máximo 2 coberturas.");
      return;
    }
    setPedido({
      ...pedido,
      cobertura: [...pedido.cobertura, nome],
    });
  }
}

  function handleNext() {
    router.push("/pages/3-cremes");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-700 font-semibold">
        Carregando Coberturas...
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 flex flex-col items-center bg-gradient-to-b from-purple-500 to-white">
        <h1 className="text-2xl font-bold mb-2 text-purple-800">Escolha suas coberturas</h1>
        <p className="text-left font-semibold mb-8 text-purple-700">Escolha até duas coberturas</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
            {coberturas.map((c) => (
                <button key={c.nome} onClick={() => toggleCobertura(c.nome)} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center
                    ${ pedido.cobertura.includes(c.nome)
                        ? "border-purple-100 bg-purple-500"
                        : "border-purple-600 bg-white hover:border-purple-100 hover:bg-purple-300"}`}>

                    <div className="text-center">
                    <p className="font-semibold text-gray-800">{c.nome}</p>
                    </div>
                </button>
            ))}
        </div>
        <br></br>

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
    </main>
  );
}
