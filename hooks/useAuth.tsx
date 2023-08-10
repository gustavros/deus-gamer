import { auth } from "@/db/firebase";
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { create } from "zustand";

const provider = new GoogleAuthProvider();

interface AuthState {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
  loadStorageData: () => void;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,

  signInWithGoogle: () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken ?? "";
        const user = result.user;

        set({
          user,
          loading: false,
        });

        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

        toast.success("Login realizado com sucesso!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        toast.error(errorMessage);
      });
  },
  signOut: () => {
    sessionStorage.clear();

    set({
      user: null,
      loading: false,
    });

    toast.success("Você saiu da sua conta.");
  },

  loadStorageData: () => {
    const token = sessionStorage.getItem("@AuthFirebase:token");
    const user = sessionStorage.getItem("@AuthFirebase:user");

    if (token && user) {
      set({
        user: JSON.parse(user),
        loading: false,
      });
    }
  },
}));

export default useAuth;
