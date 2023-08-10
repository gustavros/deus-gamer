"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback } from "react";

import { Modal } from "./Modal";

import Heading from "../Heading";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { signInWithGoogle, signInWithGithub, loading } = useAuth();

  console.log(`loading: ${loading}`);

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Registre-se com suas redes!" />

      <div className="flex flex-col items-center gap-3 mt-3">
        <Button
          className="hover:bg-neutral-800 flex gap-4"
          variant={"outline"}
          onClick={() => {
            signInWithGoogle();

            loginModal.onClose();
          }}
        >
          <FcGoogle className="mr-2" size={24} />
          Cadastrar com Google
        </Button>

        <Button
          disabled
          className="hover:bg-neutral-800 flex gap-4 w-fit"
          variant={"outline"}
          onClick={() => {
            signInWithGithub();

            loginModal.onClose();
          }}
        >
          <AiFillGithub className="mr-2" size={24} />
          Cadastrar com Github
        </Button>

        <Separator className="w-full bg-neutral-700" />

        <div className=" text-neutral-500 text-center mt-4 font-light">
          <div className=" justify-center flex flex-row items-center gap-2">
            <div className="">Já tem uma conta?</div>
            <div
              onClick={toggle}
              className="text-primary-800 cursor-pointer hover:underline"
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
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Registre-se"
      onClose={registerModal.onClose}
      body={bodyContent}
    />
  );
};
