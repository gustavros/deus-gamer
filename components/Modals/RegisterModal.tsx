"use client";

import { FcGoogle } from "react-icons/fc";
import { useCallback } from "react";

import { Modal } from "./Modal";
import { Button } from "../Button";
import Heading from "../Heading";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useAuth from "@/hooks/useAuth";

export const RegisterModal = () => {
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
      <Heading title="Registre-se agora mesmo!" />

      <div className="flex flex-col gap-3 mt-3">
        <hr />
        <Button
          outline
          label="Cadastrar com Google"
          icon={FcGoogle}
          onClick={() => {
            signInWithGoogle();

            registerModal.onClose();
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
