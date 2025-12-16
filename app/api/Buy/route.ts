import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // receber o body vindo do frontend
    const body = await req.json();

    // reenviar para a API real
    const res = await fetch("https://deisishop.pythonanywhere.com/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorText = await res.text();
      return new Response(errorText, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    return new Response(
      `Erro na API buy: ${error}`,
      { status: 500 }
    );
  }
}
