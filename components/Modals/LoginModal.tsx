"use client";

import { useCallback, useState } from "react";

import { z } from "zod";

import axios from "axios";
import Heading from "../Heading";
import { Modal } from "./Modal";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

import { toast } from "react-hot-toast";

import { loginSchema } from "@/schemas/loginSchema";
import Cookies from "universal-cookie";

type loginSchema = z.infer<typeof loginSchema>;
const cookies = new Cookies();

export const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginSchema> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/auth/loginr", data)
      .then((res) => {
        toast.success("Login realizado com sucesso!");
        cookies.set("token", res.data.token, { path: "/" });

        console.log(res);

        loginModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        
        toast.error("Ocorreu um erro ao realizar o login!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onOpen();
    loginModal.onClose();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading center title="Entre na sua conta" />

      <div className="flex flex-col items-center gap-3 mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="text-neutral-500 mb-0.5">
              E-mail
            </label>
            <Input
              placeholder="Seu email preferido"
              type="text"
              {...register("email")}
              className="bg-transparent "
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-neutral-500 mb-0.5">
              Senha
            </label>
            <Input
              placeholder="Digite sua senha preferida"
              type="password"
              {...register("password")}
              className="bg-transparent"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isLoading}
            className="hover:bg-amber-500 flex gap-4 w-full mt-4 bg-amber-400 text-black border border-white"
            variant={"default"}
            type="submit"
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </form>

        <Separator className="w-full bg-neutral-700" />

        <div className=" text-neutral-500 text-center font-light">
          <div className=" justify-center flex flex-row items-center gap-2">
            <div className="">Não tem uma conta ainda? </div>
            <div
              onClick={toggle}
              className="text-primary-800 cursor-pointer hover:underline text-amber-400"
            >
              Registre-se
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      body={bodyContent}
    />
  );
};
