"use client";

import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface User {
  id: string;
  email: string;
  name: string;
}

function useAuthentication() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = cookies.get("token");

    if (token) {
      const secret = process.env.NEXT_PUBLIC_SECRET_JWT as string;

      try {
        const decoded = jwt.verify(token, secret) as User;

        setUser(decoded);
      } catch (error) {
        console.error("Erro ao validar o token:", error);
      }
    }
  }, [cookies.get("token")]);

  const logout = () => {
    cookies.remove("token");

    

    setUser(null);
  };

  return { user, logout };
}

export default useAuthentication;
