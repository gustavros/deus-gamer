import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Você precisa estar logado para visualizar favoritos" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favorites: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user.favorites);
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
