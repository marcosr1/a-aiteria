"use client";

import ResumoPedido from "../../components/resumoPedido/resumoPedido";
import Footer from "../../components/footer/footer";

export default function ResumoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <ResumoPedido />
      </main>
      <Footer />
    </div>
  );
}