import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "complementosPremium.json");

interface complementosPremium {
  id: number,
  nome: string,
  preco: number,
  ativo: boolean
}

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: complementosPremium) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const complementosPremium = readData();
  return NextResponse.json(complementosPremium);
}

export async function PUT(req: Request) {
  try {
    const { nome, ativo } = await req.json();
    const complementosPremium = readData();
    const index = complementosPremium.findIndex((c: complementosPremium) => c.nome === nome);

    if (index === -1) {
      return NextResponse.json({ error: "Complemento não encontrada" }, { status: 404 });
    }

    complementosPremium[index].ativo = ativo;
    writeData(complementosPremium);

    return NextResponse.json({ message: "Complemento atualizada com sucesso!", complementosPremium });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar Complemento" }, { status: 500 });
  }
}
