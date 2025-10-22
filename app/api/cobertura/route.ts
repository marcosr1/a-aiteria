import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { atualizarItemGitHub } from "@/lib/githubUtils";

const filePath = path.join(process.cwd(), "data", "coberturas.json");

interface Cobertura {
  nome: string;
  ativo: boolean;
}

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
} 

export async function GET() {
  const coberturas = readData();
  return NextResponse.json(coberturas);
}

export async function PUT(req: Request) {
  const { nome, ativo } = await req.json();
  const result = await atualizarItemGitHub("coberturas", nome, ativo);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}
