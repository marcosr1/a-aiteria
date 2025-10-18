import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "cremes.json");

interface Cremes {
  id: number,
  nome: string,
  ativo: boolean
}

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data: Cremes) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const cremes = readData();
  return NextResponse.json(cremes);
}

export async function PUT(req: Request) {
  try {
    const { nome, ativo } = await req.json();
    const cremes = readData();
    const index = cremes.findIndex((c: Cremes) => c.nome === nome);

    if (index === -1) {
      return NextResponse.json({ error: "Complemento não encontrada" }, { status: 404 });
    }

    cremes[index].ativo = ativo;
    writeData(cremes);

    return NextResponse.json({ message: "Complemento atualizada com sucesso!", cremes });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao atualizar Complemento" }, { status: 500 });
  }
}
