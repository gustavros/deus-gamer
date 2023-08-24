import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "Você precisa estar logado para favoritar um jogo" },
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

    if (user.favorites.includes(gameId)) {
      return NextResponse.json(
        { message: "Você já favoritou esse jogo" },
        { status: 401 }
      );
    }

    user.favorites.push(gameId);

    await prisma.user.update({
      where: { id: userId },
      data: { favorites: user.favorites },
    });

    return NextResponse.json({ message: "Jogo não favoritado ainda" });
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json(
      { message: "Ocorreu um erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
