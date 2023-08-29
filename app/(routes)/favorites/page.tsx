"use client";

import { getGame } from "@/actions/get-game";
import Loading from "@/components/Loading";
import useAuthentication from "@/hooks/useAuthentication";
import useLoginModal from "@/hooks/useLoginModal";
import { IGameList } from "@/interfaces/IGameList";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { BsTrash } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const Favorites = () => {
  const { user } = useAuthentication();

  const loginModal = useLoginModal();

  const [favorites, setFavorites] = useState([]);
  const [games, setGames] = useState<IGameList[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [confirmations, setConfirmations] = useState<{
    [key: number]: boolean;
  }>({});

  const handleToggleConfirm = (gameId: number) => {
    setConfirmations((prev) => ({ ...prev, [gameId]: !prev[gameId] }));
  };

  function handleRemoveFavorite(gameId: number, userId: string) {
    if (user) {
      setLoading(true);

      axios
        .delete("/api/favorite/remove-from-favorites", {
          data: {
            gameId,
            userId,
          },
        })
        .then(() => {
          setFavorites((prev) =>
            prev.filter((favorite) => favorite !== gameId)
          );

          toast.success("Jogo removido dos favoritos com sucesso!");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (user) {
      setLoading(true);

      axios
        .get("/api/favorite/get-favorites", {
          params: {
            userId: user.id,
          },
        })
        .then((res) => {
          setFavorites(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    const fetchGames = async () => {
      const fetchedGames = await Promise.all(
        favorites.map(async (favorite) => {
          const game = await getGame(favorite);

          return game;
        })
      );

      setGames(fetchedGames);
    };

    fetchGames();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-neutral-900 px-8">
      <h1 className="text-amber-400 text-3xl font-bold py-8 text-center">
        Favoritos
      </h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {loading && <Loading />}

        {!user && (
          <div>
            <p className="text-neutral-100">
              Você precisa estar logado para ver seus favoritos.
            </p>

            <p className="text-center">
              Faça login clicando
              <Button
                variant={"link"}
                className="text-amber-400 pl-2"
                onClick={loginModal.onOpen}
              >
                aqui
              </Button>
            </p>
          </div>
        )}

        {games?.map((game) => (
          <div
            key={game.id}
            className="bg-neutral-800 rounded-md p-4 flex flex-col gap-4 w-96"
          >
            <h2 className="text-neutral-100 text-xl font-bold ">
              {game.title}
            </h2>
            <img
              className="rounded-md object-cover"
              src={game.thumbnail}
              alt={game.title}
            />

            <div className="flex items-center gap-2 w-full">
              <Link
                href={`/game/${game.id}`}
                className=" bg-amber-500 hover:bg-amber-600 p-2 rounded-lg text-sm text-center flex-1"
              >
                Ver mais
              </Link>
              <Button
                onClick={() => handleToggleConfirm(game.id)}
                variant={"default"}
                size={"sm"}
                className=" bg-red-500 hover:bg-red-600 text-sm"
              >
                {confirmations[game.id] ? (
                  <span
                    onClick={() => handleRemoveFavorite(game.id, user?.id!)}
                  >
                    Confirmar
                  </span>
                ) : (
                  <BsTrash />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
