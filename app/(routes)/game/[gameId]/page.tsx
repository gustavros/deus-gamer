"use client";

import React, { useEffect, useState } from "react";

import { getGame } from "@/actions/get-game";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

import { BsBrowserEdge, BsPlusCircle, BsWindows } from "react-icons/bs";
import { IGame } from "@/interfaces/IGame";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuthentication from "@/hooks/useAuthentication";
import { User } from "@prisma/client";

const url = "https://www.freetogame.com/";

const GamePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<IGame>({} as IGame);
  const [mainScreenshot, setMainScreenshot] = useState("");

  const { user } = useAuthentication();
  const params = useParams();

  useEffect(() => {
    async function loadGame() {
      const response = await getGame(Number(params.gameId));

      setGame(response);

      window.scrollTo(0, 0);
      setLoading(false);
    }

    loadGame();
  }, [params.gameId]);

  useEffect(() => {
    if (game.screenshots) {
      setMainScreenshot(game.screenshots[0].image);
    }

    return () => {
      setMainScreenshot("");
    };
  }, [game]);

  function handleScreenshotClick(screenshotId: number) {
    const screenshot = game.screenshots?.find(
      (screenshot) => screenshot.id === screenshotId
    );

    if (screenshot) {
      setMainScreenshot(screenshot.image);
    }
  }

  function handleAddToFavorites() {
    axios
      .post("/api/favorite/add-to-favorites", {
        gameId: game.id,
        userId: user?.id,
      })
      .then(() => {
        toast.success("Jogo adicionado aos favoritos com sucesso!");

        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  useEffect(() => {
    if (user) {
      axios
        .get("/api/favorite/get-favorites", {
          params: {
            userId: user.id,
          },
        })
        .then((res) => {
          setFavorites(res.data);
        });
    }
  }, [user]);

  const isGameInFavorites = (gameId: number) => {
    const game = favorites.find((favorite) => favorite == gameId);

    return game;
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-neutral-900 text-white py-20">
          <div className="container mx-auto">
            <div className="p-6">
              <h1 className="text-5xl font-bold text-amber-400 pb-2">
                {game.title}
              </h1>

              <div className="flex md:flex-row flex-col-reverse justify-between items-start gap-8 mt-4">
                <div>
                  <div className="flex flex-col gap-8">
                    <div>
                      <img
                        src={mainScreenshot}
                        alt="Screenshot principal do jogo"
                        className="w-[1280px] h-auto rounded shadow-md"
                        id="mainScreenshot"
                      />
                    </div>
                    <div className="flex gap-4">
                      {game.screenshots?.map((screenshot) => {
                        return (
                          <img
                            onClick={() => handleScreenshotClick(screenshot.id)}
                            key={screenshot.id}
                            src={screenshot.image}
                            className="w-24 lg:w-56 h-auto rounded shadow-md cursor-pointer"
                          />
                        );
                      })}
                    </div>

                    <p className="text-white text-lg leading-relaxed max-w-screen-lg">
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="md:w-auto w-full">
                  <div>
                    <img
                      src={game.thumbnail}
                      alt={game.short_description}
                      className="mb-2 rounded shadow-md md:w-auto w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="bg-gray-700/50 text-white text-xs p-1 rounded w-fit uppercase">
                      Jogo base
                    </span>
                    <div className="flex flex-col gap-4">
                      <a
                        href={`${url}open/${game.id}`}
                        target="_blank"
                        className="py-4 px-8 bg-amber-400 text-zinc-900 flex items-center justify-center rounded uppercase w-full text-center max-w-full hover:bg-amber-500 transition-all"
                      >
                        Jogar agora
                      </a>

                      {!isGameInFavorites(game.id) ? (
                        <button
                          onClick={handleAddToFavorites}
                          className="py-2 px-8 bg-transnparent text-zinc-100 flex gap-2 items-center justify-center rounded uppercase border text-xs w-full text-center max-w-full hover:bg-zinc-100 hover:text-zinc-900 transition-all"
                        >
                          <BsPlusCircle size={20} />

                          <span>Adicionar aos favoritos</span>
                        </button>
                      ) : (
                        <Link
                          className="py-2 px-8 bg-transnparent text-zinc-100 flex gap-2 items-center justify-center rounded uppercase border text-xs w-full text-center max-w-full hover:bg-zinc-100 hover:text-zinc-900 transition-all"
                          href="/favorites"
                        >
                          Adicionado aos favoritos
                        </Link>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mt-4 my-2">
                      <span className="text-neutral-400 font-semibold text-md">
                        Desenvolvedor
                      </span>
                      <span className="font-medium text-sm text-right">
                        {game.developer}
                      </span>
                    </div>

                    <Separator
                      orientation="horizontal"
                      className="bg-neutral-700 h-[1px]"
                    />

                    <div className="flex items-center justify-between my-2">
                      <span className="text-neutral-400 font-semibold text-md">
                        Publicador
                      </span>
                      <span className="font-medium text-sm text-right">
                        {game.publisher}
                      </span>
                    </div>

                    <Separator
                      orientation="horizontal"
                      className="bg-neutral-700 h-[1px]"
                    />

                    <div className="flex items-center justify-between my-2">
                      <span className="text-neutral-400 font-semibold text-md">
                        Data de lançamento
                      </span>
                      <span className="font-medium text-sm text-right">
                        {new Date(game.release_date).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>

                    <Separator
                      orientation="horizontal"
                      className="bg-neutral-700 h-[1px]"
                    />

                    <div className="flex items-center justify-between my-2">
                      <span className="text-neutral-400 font-semibold text-md">
                        Gênero
                      </span>
                      <span className="font-medium text-sm text-right">
                        {game.genre}
                      </span>
                    </div>

                    <Separator
                      orientation="horizontal"
                      className="bg-neutral-700 h-[1px]"
                    />

                    <div className="flex items-center justify-between my-2">
                      <span className="text-neutral-400 font-semibold text-md">
                        Plataforma
                      </span>
                      <span className="font-medium text-sm text-right">
                        {game.platform === "Windows" && <BsWindows size={20} />}
                        {game.platform === "Web Browser" && (
                          <BsBrowserEdge size={20} />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mt-8 divide-x-2 divide-zinc-700 gap-8 w-96 ">
                <div>
                  <h2 className="text-neutral-400">Gêneros</h2>

                  <span className="underline">{game.genre}</span>
                </div>

                <div className="pl-8">
                  <h2 className="text-neutral-400">Características</h2>

                  <span className="underline">{game.platform}</span>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Especificações
                </h2>
                <div className="bg-neutral-800/40 p-4 rounded w-fit">
                  <div className="mb-4 flex flex-col">
                    <h3 className="text-neutral-400 text-md leading-relaxed">
                      Sistema operacional
                    </h3>
                    <p>
                      {game.minimum_system_requirements?.os
                        ? game.minimum_system_requirements.os
                        : "-"}
                    </p>
                  </div>

                  <div className="mb-4 flex flex-col">
                    <h3 className="text-neutral-400 text-md leading-relaxed">
                      Processador
                    </h3>
                    <p>
                      {game.minimum_system_requirements?.processor
                        ? game.minimum_system_requirements.processor
                        : "-"}
                    </p>
                  </div>

                  <div className="mb-4 flex flex-col">
                    <h3 className="text-neutral-400 text-md leading-relaxed">
                      Memória
                    </h3>
                    <p>
                      {game.minimum_system_requirements?.memory
                        ? game.minimum_system_requirements.memory
                        : "-"}
                    </p>
                  </div>

                  <div className="mb-4 flex flex-col">
                    <h3 className="text-neutral-400 text-md leading-relaxed">
                      Placa de vídeo
                    </h3>
                    <p>
                      {game.minimum_system_requirements?.graphics
                        ? game.minimum_system_requirements.graphics
                        : "-"}
                    </p>
                  </div>

                  <div className="mb-4 flex flex-col">
                    <h3 className="text-neutral-400 text-md leading-relaxed">
                      Armazenamento
                    </h3>
                    <p>
                      {game.minimum_system_requirements?.storage
                        ? game.minimum_system_requirements.storage
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GamePage;
