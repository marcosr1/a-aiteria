import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "coberturas.json");

interface Cobertura {
  nome: string;
  ativo: boolean;
}

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: Cobertura[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const coberturas = readData();
  return NextResponse.json(coberturas);
}

export async function PUT(req: Request) {
  try {
    const { nome, ativo } = await req.json();
    const coberturas = readData();
    const index = coberturas.findIndex((c: Cobertura) => c.nome === nome);

    if (index === -1) {
      return NextResponse.json({ error: "Cobertura não encontrada" }, { status: 404 });
    }

    coberturas[index].ativo = ativo;
    writeData(coberturas);

    return NextResponse.json({ message: "Cobertura atualizada com sucesso!", coberturas });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar cobertura" }, { status: 500 });
  }
}
