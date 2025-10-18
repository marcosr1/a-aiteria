import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "complementos.json");

interface Complementos {
  id: number;
  nome: string;
  ativo: boolean;
}

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: Complementos) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const complementos = readData();
  return NextResponse.json(complementos);
}

export async function PUT(req: Request) {
  try {
    const { nome, ativo } = await req.json();
    const complementos = readData();
    const index = complementos.findIndex((c: Complementos) => c.nome === nome);

    if (index === -1) {
      return NextResponse.json({ error: "Complemento não encontrada" }, { status: 404 });
    }

    complementos[index].ativo = ativo;
    writeData(complementos);

    return NextResponse.json({ message: "Complemento atualizada com sucesso!", complementos });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar Complemento" }, { status: 500 });
  }
}
