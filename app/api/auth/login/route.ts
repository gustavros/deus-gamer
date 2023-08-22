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
    return NextResponse.json(
      { error: "E-mail não existe" },
      {
        status: 400,
      }
    );
  }

  const isPasswordValid = bcrypt.compare(password, user?.hashedPassword);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: "Senha inválida" },
      {
        status: 400,
      }
    );
  }

  const secret = process.env.NEXT_SECRET_JWT as string;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}
