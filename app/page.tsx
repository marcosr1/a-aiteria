'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 to-purple-100 p-4">
      <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">
        Bem-vindo à Açaiteria!
      </h1>
      <p className="text-lg text-purple-700 mb-8 text-center max-w-md">
        Monte seu açaí do jeito que você gosta! Escolha o tamanho, os cremes e os complementos, e envie seu pedido direto para nosso WhatsApp.
      </p>

      <button
        className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
        onClick={() => router.push("/pages/1-tamanho")}
      >
        Iniciar Pedido
      </button>
    </div>
  );
}
