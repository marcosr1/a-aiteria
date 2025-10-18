"use client";

import { usePedido } from "../../context/PedidoContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Tamanho = {
  nome: string;
  imagem: string;
  descricao: string;
  preco: number;
  ativo: boolean;
};

export default function TamanhoPage() {
  const { pedido, setPedido } = usePedido();
  const router = useRouter();
  const [tamanhos, setTamanhos] = useState<Tamanho[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTamanhos() {
      try {
        const res = await fetch("/api/tamanhos");
        if (!res.ok) throw new Error("Erro ao carregar os tamanhos");
        const data: Tamanho[] = await res.json();
        setTamanhos(data.filter((t) => t.ativo));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchTamanhos();
  }, []);

  const handleSelect = (tamanho: Tamanho) => {
  setPedido((prev) => ({ ...prev, tamanho: tamanho.nome, precoCopo: tamanho.preco }));
};

function handleNext() {
    router.push("/pages/2-coberturas");
  }

  if (loading) {
    return <p className="text-center mt-10 text-purple-300">Carregando coberturas...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gradient-to-b from-purple-500 to-white">
      <h1 className="text-3xl font-bold text-purple-800">Escolha o tamanho do copo!</h1>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {tamanhos.map((t) => (
          <button
            key={t.nome}
            className={`p-6 rounded-lg border-2 text-lg font-semibold transition-all 
              ${pedido.tamanho === t.nome
                ? "border-purple-100 bg-purple-500 " 
                : "border-purple-600 hover:border-purple-100 hover:bg-purple-300"}`}
            onClick={() => handleSelect(t)}
          >
            <Image
              src={t.imagem}
              alt={t.nome}
              width={500}
              height={400}
              className="w-full h-auto"
            />
            <span className={`text-lg font-semilight ${pedido.tamanho === t.nome ? "text-white" : "text-purple-500" }`}>{t.descricao}</span><br></br>
            <span className={`text-lg text-1x1 font-semilight ${pedido.tamanho === t.nome ? "text-white" : "text-purple-500" }`}>{t.nome}</span><br></br>
            <span className={`text-lg font-semilight ${pedido.tamanho === t.nome ? "text-emerald-500" : "text-purple-500" }`}> R$ {t.preco},00</span>
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
    </div>
  );
}
