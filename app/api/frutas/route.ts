import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "frutas.json");

interface Frutas {
  id: number,
  nome: string,
  ativo: boolean
}

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: Frutas) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const frutas = readData();
  return NextResponse.json(frutas);
}

export async function PUT(req: Request) {
  try {
    const { nome, ativo } = await req.json();
    const frutas = readData();
    const index = frutas.findIndex((c: Frutas) => c.nome === nome);

    if (index === -1) {
      return NextResponse.json({ error: "Complemento não encontrada" }, { status: 404 });
    }

    frutas[index].ativo = ativo;
    writeData(frutas);

    return NextResponse.json({ message: "Complemento atualizada com sucesso!", frutas });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar Complemento" }, { status: 500 });
  }
}
