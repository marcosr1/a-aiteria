'use client';

import { useRouter } from "next/navigation";
import Image from "next/image"
import Footer from "./components/footer/footer";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-purple-200 to-purple-100 p-4">
      <div className="relative w-75 h-75 mb-6 rounded-full overflow-hidden shadow-lg">
       <Image
          src="/logoimperioacai.jpg" 
          alt="Açaí delicioso"
          fill
          quality={100}
          className="object-cover object-[50%_35%]" 
          />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-purple-800 mb-6 text-center whitespace-nowrap">
        Bem-vindo à Império Açaí!
      </h1>
      <p className="text-lg text-2x1 text-purple-700 mb-8 text-center max-w-md">
        Monte seu açaí do jeito que você gosta! Escolha o tamanho, os cremes e os complementos, e envie seu pedido direto para nosso WhatsApp.
      </p>

      <button
        className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all"
        onClick={() => router.push("/pages/1-tamanho")}>
        Iniciar Pedido
      </button>

      <Footer />
    </div>
  );
}
