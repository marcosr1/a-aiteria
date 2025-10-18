"use client";
import { usePedido } from "../../context/PedidoContext";
import { useRouter } from "next/navigation";

export default function FormEndereco() {
  const { pedido, setPedido } = usePedido();
  const router = useRouter();

  const handleNext = () => {
    router.push("/pages/resumo");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gradient-to-b from-purple-500 to-white">
      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-6">

        <h2 className="text-3xl font-bold text-purple-800 mb-3">
          🍧 Informações de Entrega
        </h2>

        <div className="space-y-3">
          <div>
            <label className="ml-3 block text-sm font-semibold mb-1 text-purple-500">Nome e Sobrenome</label>
            <input
              type="text"
              placeholder="Digite seu nome..."
              value={pedido.nome}
              onChange={(e) => setPedido({ ...pedido, nome: e.target.value })}
              className="w-full p-3 rounded-2xl border-1 border-purple-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              maxLength={30}
            />
          </div>

          <div>
            <label className="ml-3 block text-sm font-semibold mb-1 text-purple-500">Endereço completo</label>
            <input
              type="text"
              placeholder="Rua, número, bairro..."
              value={pedido.endereco}
              onChange={(e) => setPedido({ ...pedido, endereco: e.target.value })}
              className="w-full p-3 rounded-2xl border-1 border-purple-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              maxLength={100}
            />
          </div>

          <div>
            <label className="ml-3 block text-sm font-semibold mb-1 text-purple-500">
              Observação (opcional)
            </label>
            <textarea
              placeholder="Ex: portão azul, casa com muro branco..."
              value={pedido.descricao || ""}
              onChange={(e) => setPedido({ ...pedido, descricao: e.target.value })}
              className="w-full p-3 rounded-2xl border-1 border-purple-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              rows={2}
              maxLength={200}
            />
          </div>
        </div>

        <p className="text-sm text-purple-400 text-center mt-4">
          Essas informações serão exibidas no resumo do seu pedido 💜
        </p>

        <div className="flex gap-4 mt-6">
        <button
          className="px-6 py-2 rounded border-2 border-purple-600 bg-white text-black hover:bg-purple-300 hover:border-purple-100"
          onClick={() => router.back()}>
          Voltar
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-900 text-white px-8 py-3 rounded-lg text-lg font-semibold"
          onClick={handleNext}>
          Próximo
        </button>
      </div>

      </div>
    </div>
  );
}
