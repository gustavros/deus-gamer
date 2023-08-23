import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({
      error: "Usuário não encontrado",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user?.hashedPassword);

  if (isPasswordValid) {
    const secret = process.env.NEXT_SECRET_JWT as string;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      secret,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }

        return token;
      }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } else {
    return NextResponse.json({
      error: "Usuário não encontrado",
    });
  }
}
