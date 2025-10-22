// src/lib/githubUtils.ts

const owner = process.env.GITHUB_OWNER!;
const repo = process.env.GITHUB_REPO!;

interface Item {
  nome: string;
  ativo: boolean;
}

export async function atualizarItemGitHub(tipo: string, nome: string, ativo: boolean) {
  const path = `data/${tipo}.json`;

  // 1. Buscar o conteúdo atual no GitHub
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  const data = await res.json();

  if (!data.content || !data.sha) {
    return { error: "Falha ao ler arquivo do GitHub", status: 500 };
  }

  // 2. Decodificar o conteúdo
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  const json = JSON.parse(content);

  // 3. Atualizar o item
  const index = json.findIndex((i: Item) => i.nome === nome);
  if (index === -1) return { error: "Item não encontrado", status: 404 };

  json[index].ativo = ativo;

  // 4. Criar novo conteúdo base64
  const newContent = Buffer.from(JSON.stringify(json, null, 2)).toString("base64");

  // 5. Commitar no GitHub
  await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      message: `Atualiza ${tipo}: ${nome} -> ativo=${ativo}`,
      content: newContent,
      sha: data.sha,
    }),
  });

  return { success: true, nome, ativo };
}