"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";

import { Modal } from "./Modal";
import { Button } from "../Button";
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

export const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { signInWithGoogle, loading } = useAuth();

  console.log(`loading: ${loading}`);

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Faça login com suas redes!" />

      <div className="flex flex-col gap-3 mt-3">
        <hr />
        <Button
          outline
          label="Continuar com Google"
          icon={FcGoogle}
          onClick={() => {
            signInWithGoogle();

            loginModal.onClose();
          }}
        />

        <div
          className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
        >
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
