import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { senha } = await req.json();
  const SENHA = process.env.DASHBOARD_SENHA;

  if (senha === SENHA) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("token", "autenticado", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });
    return response;
  }

  return NextResponse.json({ success: false, message: "Senha incorreta" }, { status: 401 });
}
