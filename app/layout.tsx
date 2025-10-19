import type { Metadata } from "next"; 
import "./globals.css";
import { PedidoProvider } from "./context/PedidoContext";
import BlockDevTools from "./components/blockDev/blockDevTools";

export const metadata: Metadata = {
  title: "Império Açaí",
  description: "Site do melhor açaí",
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="pt-BR">
      <body>
        <PedidoProvider>
          <BlockDevTools />
          {children}
        </PedidoProvider>
      </body>
    </html>
  );
} 