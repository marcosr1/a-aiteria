"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

interface Pedido {
  nome: string;
  endereco: string;
  descricao?: string;
  tamanho: string;
  cremes: string[];
  cobertura: string[];
  frutas: string[];
  complementos: string[];
  premium: { id: number; nome: string; preco: number; ativo: boolean }[];
  precoCopo: number;
  total: number;
}

interface PedidoContextProps {
  pedido: Pedido;
  setPedido: React.Dispatch<React.SetStateAction<Pedido>>;
  toggleItem: (categoria: keyof Pedido, nome: string, limite?: number) => void;
  resetPedido: () => void;
}

const PedidoContext = createContext<PedidoContextProps | undefined>(undefined);


export const PedidoProvider = ({ children }: { children: ReactNode }) => {
  const [pedido, setPedido] = useState<Pedido>({
    nome: "",
    endereco: "",
    descricao: "",
    tamanho: "",
    cremes: [],
    cobertura: [],
    frutas: [],
    complementos: [],
    premium: [],
    precoCopo: 0,
    total: 0,
  });


  const toggleItem = (categoria: keyof Pedido, nome: string, limite?: number) => {
    setPedido((prev) => {
      const selecionados = prev[categoria] as string[];

      if (selecionados.includes(nome)) {
        return {
          ...prev,
          [categoria]: selecionados.filter((i) => i !== nome),
        };
      }

      if (limite && selecionados.length >= limite) {
        toast.error(`Você só pode selecionar no máximo ${limite} itens!`);
        return prev;
      }
      return {
        ...prev,
        [categoria]: [...selecionados, nome],
      };
    });
  };

  const resetPedido = () => {
    setPedido({
      nome: "",
      endereco: "",
      descricao: "",
      tamanho: "",
      cremes: [],
      cobertura: [],
      frutas: [],
      complementos: [],
      premium: [],
      precoCopo: 0,
      total: 0,
    });
  };

  return (
    <PedidoContext.Provider value={{ pedido, setPedido, toggleItem, resetPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedido = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("usePedido deve ser usado dentro de um PedidoProvider");
  }
  return context;
};
