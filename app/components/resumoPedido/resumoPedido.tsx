"use client";

import { usePedido } from "../../context/PedidoContext";

export default function ResumoPedido() {
  const { pedido } = usePedido();

  const enviarWhatsApp = () => {
    const numeroVendedora = "5586995460638";
    const mensagem = `Olá! Gostaria de fazer um pedido:

Nome: ${pedido.nome || "-"}
Endereço: ${pedido.endereco || "-"}
Descrição: ${pedido.descricao || "-"}

Tamanho: ${pedido.tamanho || "-"}
Cremes: ${pedido.cremes.length > 0 ? pedido.cremes.join(", ") : "-"}
Coberturas: ${pedido.cobertura.length > 0 ? pedido.cobertura.join(", ") : "-"}
Frutas: ${pedido.frutas.length > 0 ? pedido.frutas.join(", ") : "-"}
Complementos: ${pedido.complementos.length > 0 ? pedido.complementos.join(", ") : "-"}
Complementos Premium: ${
    pedido.premium && pedido.premium.length > 0
    ? pedido.premium.map((c) => c.nome).join(", ")
    : "-"
    }

Total a pagar: R$ ${(
    pedido.precoCopo +
    (pedido.premium?.reduce((total, c) => total + c.preco, 0) || 0) + 2).toFixed(2)}`;
  
  const url = `https://wa.me/${numeroVendedora}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
};

  const totalPedido =
    pedido.precoCopo + (pedido.premium?.reduce((total, c) => total + c.preco, 0) || 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 bg-gradient-to-b from-purple-400 to-purple-100">
      <h1 className="text-3xl font-bold text-purple-800">Resumo do Pedido</h1>

      <div className="text-lg bg-white p-8 rounded-lg shadow-md w-full max-w-md text-black">
        <p>
          <strong>Tamanho:</strong> {pedido.tamanho || "-"}
        </p>
        <p>
          <strong>Coberturas:</strong>{" "}
          {pedido.cobertura.length > 0 ? pedido.cobertura.join(", ") : "-"}
        </p>
        <p>
          <strong>Cremes:</strong> {pedido.cremes.length > 0 ? pedido.cremes.join(", ") : "-"}
        </p>
        <p>
          <strong>Frutas:</strong> {pedido.frutas.length > 0 ? pedido.frutas.join(", ") : "-"}
        </p>
        <p>
          <strong>Complementos:</strong>{" "}
          {pedido.complementos.length > 0 ? pedido.complementos.join(", ") : "-"}
        </p>

        {pedido.premium && pedido.premium.length > 0 && (
          <div>
            <p>
              <strong>Complementos Premium:</strong>{" "}
              {pedido.premium.map((c) => c.nome).join(", ")}
            </p>
            <p>
              <strong>Total a pagar pelos Complementos Premium:</strong>{" "}
              <span className="text-emerald-500">
                R${pedido.premium.reduce((total, c) => total + c.preco, 0).toFixed(2)}
              </span>
            </p>
          </div>
        )}

        <p>
          <strong>Preço do Copo:</strong>{" "}
          <span className="text-emerald-500">R${pedido.precoCopo.toFixed(2)}</span>
        </p>
        <p>
          <strong>Taxa da entrega:</strong>{" "}
          <span className="text-emerald-500">R$ 2.00</span>
        </p>
        <p>
          <strong>Total:</strong>{" "}
          <span className="text-emerald-500">R${(totalPedido + 2).toFixed(2)}</span>
        </p>
      </div>
      <div className="text-lg bg-white p-8 rounded-lg shadow-md w-full max-w-md text-black">
        <div>
          <strong>Confirme seu endereço:</strong>{" "}
          <p><strong>Nome: </strong> <span className="text-gray-800">{pedido.nome || "—"}</span>{" "} </p>
          <p><strong>Endereço: </strong> <span className="text-gray-800">{pedido.endereco || "—"}</span>{" "} </p>
          <p><strong>Descrição: </strong> <span className="text-gray-800">{pedido.descricao || "—"}</span> </p>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="px-6 py-2 rounded bg-white text-black hover:bg-gray-400"
          onClick={() => window.history.back()}>
          Voltar
        </button>
        <button
          className="px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700"
          onClick={enviarWhatsApp}>
          Enviar para WhatsApp
        </button>
      </div>
    </div>
  );
}
