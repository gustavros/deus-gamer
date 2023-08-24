"use client";

import { getGame } from "@/actions/get-game";
import Loading from "@/components/Loading";
import useAuthentication from "@/hooks/useAuthentication";
import useLoginModal from "@/hooks/useLoginModal";
import { IGameList } from "@/interfaces/IGameList";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Favorites = () => {
  const { user } = useAuthentication();

  const loginModal = useLoginModal();

  const [favorites, setFavorites] = useState([]);
  const [games, setGames] = useState<IGameList[] | null>([]);
  const [loading, setLoading] = useState(false);

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
      <h1 className="text-amber-400 text-2xl font-bold py-8">Favoritos</h1>

      <div className="flex flex-wrap gap-4 ">
        {loading && <Loading />}

        {!user && (
          <div>
            <p className="text-neutral-100">
              Você precisa estar logado para ver seus favoritos.
            </p>

            <p>
              Faça login clicando{" "}
              <button className="text-amber-400" onClick={loginModal.onOpen}>
                aqui
              </button>
            </p>
          </div>
        )}

        {games &&
          games?.map((game) => (
            <div
              key={game.id}
              className="bg-neutral-800 rounded-md p-4 flex flex-col gap-4"
            >
              <h2 className="text-neutral-100">{game.title}</h2>
              <img
                className="rounded-md w-48"
                src={game.thumbnail}
                alt={game.title}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
