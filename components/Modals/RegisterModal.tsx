"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";

import { Modal } from "./Modal";

import Heading from "../Heading";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "../ui/input";

import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";

type registerSchema = z.infer<typeof registerSchema>;

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<registerSchema> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/auth/register", data)
      .then(() => {
        toast.success("Conta criada com sucesso!");

        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(
          "Ocorreu um erro ao criar sua conta. Tente novamente mais tarde."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Crie sua conta" />

      <div className="flex flex-col items-center gap-3 mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 mb-2">
            <div>
              <label className="text-neutral-500 mb-0.5">Nome</label>
              <Input
                placeholder="Seu lindo nome"
                type="text"
                {...register("name")}
                className="bg-transparent"
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div>
              <label className="text-neutral-500 mb-0.5">Email</label>
              <Input
                placeholder="O email que você mais usa"
                type="email"
                {...register("email")}
                className="bg-transparent"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-neutral-500 mb-0.5">Sua senha</label>
            <Input
              placeholder="Digite sua senha preferida"
              type="password"
              {...register("password")}
              className="bg-transparent"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          <Button
            disabled={isLoading}
            className="hover:bg-amber-500 flex gap-4 w-full mt-4 bg-amber-400 text-black border border-white"
            variant={"default"}
            type="submit"
          >
            {isLoading ? "Carregando..." : "Criar conta"}
          </Button>
        </form>

        <Separator className="w-full bg-neutral-700" />

        <div className=" text-neutral-500 text-center font-light">
          <div className=" justify-center flex flex-row items-center gap-2">
            <div className="">Já tem uma conta?</div>
            <div
              onClick={toggle}
              className="text-primary-800 cursor-pointer hover:underline text-amber-400"
            >
              Faça login
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registre-se"
      onClose={registerModal.onClose}
      body={bodyContent}
    />
  );
};
