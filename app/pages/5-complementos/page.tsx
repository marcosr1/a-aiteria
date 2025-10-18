"use client";

import { usePedido } from "../../context/PedidoContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Complemento {
  id: number;
  nome: string;
  ativo: boolean;
}

interface ComplementoPremium {
  id: number;
  nome: string;
  preco: number;
  ativo: boolean;
}

export default function ComplementosPage() {
  const { pedido, setPedido } = usePedido();
  const router = useRouter();
  const [complementos, setComplementos] = useState<Complemento[]>([]);
  const [complementosPremium, setComplementosPremium] = useState<ComplementoPremium[]>([]);
  const [selecionados, setSelecionados] = useState<string[]>(pedido.complementos);
  const [selecionadosPremium, setSelecionadosPremium] = useState<ComplementoPremium[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplementos = async () => {
      try {
        const res = await fetch("/api/complementos");
        const res1 = await fetch("/api/complementosPremium");
        if (!res.ok && !res1.ok) throw new Error("Erro ao carregar complementos");
        const data = await res.json();
        const data1 = await res1.json();
        setComplementos(data.filter((c: Complemento) => c.ativo));
        setComplementosPremium(data1.filter((c: ComplementoPremium) => c.ativo));
        setSelecionadosPremium(pedido.premium || []);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplementos();
  }, [pedido.premium]);

  const toggleComplemento = (item: string) => {
    setSelecionados((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const toggleComplementoPremium = (item: ComplementoPremium) => {
  setSelecionadosPremium((prev) =>
    prev.some((c) => c.id === item.id)
      ? prev.filter((c) => c.id !== item.id)
      : [...prev, item]
  );
};

  const handleNext = () => {
    setPedido({
      ...pedido,
      complementos: selecionados,
      premium: selecionadosPremium,
    });
    router.push("/pages/6-nomeEndereco");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-700 font-semibold">
        Carregando complementos...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gradient-to-b from-purple-500 to-white">
      <h1 className="text-3xl font-bold text-purple-800">Escolha os complementos</h1>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {complementos.map((c) => (
          <button
            key={c.id}
            onClick={() => toggleComplemento(c.nome)}
            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all
              ${
                selecionados.includes(c.nome)
                  ? "border-purple-100 bg-purple-500"
                  : "border-purple-600 bg-white hover:border-purple-100 hover:bg-purple-300"
              }`}>
            <span className="font-semibold text-gray-800">{c.nome}</span>
          </button>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-0 text-purple-800 ">Escolha os complementos Premiums (Opcional)</h1>
      <p className="text-1xl font-semibold text-purple-700 ">Cada complementos Premium Adiciona R$ 2.00 ao preço final</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {complementosPremium.map((c) => (
          <button
            key={c.id}
            onClick={() => toggleComplementoPremium(c)}
            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all
              ${
                selecionadosPremium.some((p) => p.id === c.id)
                  ? "border-purple-100 bg-purple-500"
                  : "border-purple-600 bg-white hover:border-purple-100 hover:bg-purple-300 "
              }`}>
            <span className="font-semibold text-gray-800">{c.nome}</span>
            <span className="font-semibold text-gray-800">R$ {c.preco},00</span>
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
          className={`px-6 py-2 rounded text-white font-bold transition-all 
            ${
              selecionados.length > 0 || selecionadosPremium.length > 0
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-600 cursor-not-allowed"
            }`}
          onClick={handleNext}
          disabled={selecionados.length === 0}>
          Próximo
        </button>
      </div>
    </div>
  );
}
