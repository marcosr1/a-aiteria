import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "tamanhos.json");

interface Tamanhos {
  nome: string,
  imagem: string,
  descricao: string,
  preco: number,
  ativo: boolean
}

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: Tamanhos) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const tamanhos = readData();
  return NextResponse.json(tamanhos);
}

export async function PUT(req: Request) {
  try {
    const { nome, ativo } = await req.json();
    const tamanhos = readData();
    const index = tamanhos.findIndex((c: Tamanhos) => c.nome === nome);

    if (index === -1) {
      return NextResponse.json({ error: "Complemento não encontrada" }, { status: 404 });
    }

    tamanhos[index].ativo = ativo;
    writeData(tamanhos);

    return NextResponse.json({ message: "Complemento atualizada com sucesso!", tamanhos });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar Complemento" }, { status: 500 });
  }
}
