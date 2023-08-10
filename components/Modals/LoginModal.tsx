"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";

import { Modal } from "./Modal";

import { useRouter } from "next/navigation";
import Heading from "../Heading";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { signInWithGoogle, signInWithGithub, loading } = useAuth();

  console.log(`loading: ${loading}`);

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Faça login com suas redes!" />

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
          Entrar com Google
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
          Entrar com Github
        </Button>

        <Separator className="w-full bg-neutral-700" />

        <div className=" text-neutral-500 text-center mt-4 font-light">
          <div className=" justify-center flex flex-row items-center gap-2">
            <div className="">Não tem uma conta?</div>
            <div
              onClick={toggle}
              className="text-primary-800 cursor-pointer hover:underline"
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
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="Login"
      onClose={loginModal.onClose}
      body={bodyContent}
    />
  );
};
