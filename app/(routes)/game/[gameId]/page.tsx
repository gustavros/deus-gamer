"use client";

import { getGame } from "@/actions/get-game";
import { HeaderRoot } from "@/components/Header/HeaderRoot";
import React from "react";
import { BsPlusCircle } from "react-icons/bs";

interface GamePageProps {
  params: {
    gameId: string;
  };
}

const GamePage = async ({ params }: GamePageProps) => {
  const game = await getGame(params.gameId);

  let mainScreenshot = game.screenshots[0].image;
  const url = "https://www.freetogame.com/";

  function handleScreenshotClick(id: number) {
    console.log("clicou" + id);

    const screenshot = game.screenshots.find((screenshot) => {
      return screenshot.id === id;
    });

    const mainScreenshot = document.getElementById("mainScreenshot");

    mainScreenshot!.setAttribute("src", screenshot!.image);
  }

  return (
    <>
      <HeaderRoot />

      <div className="bg-neutral-900 text-white">
        <div className="container mx-auto">
          <div className="p-6">
            <h1 className="text-5xl font-bold text-amber-400 mb-8 py-10">
              {game.title}
            </h1>
            {/* <p className="text-zinc-200 mb-4">{game.developer}</p> */}

            <div className="flex justify-between items-start gap-8 mt-8">
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
                    {game.screenshots.map((screenshot) => {
                      return (
                        <img
                          onClick={() => handleScreenshotClick(screenshot.id)}
                          key={screenshot.id}
                          src={screenshot.image}
                          className="w-48 h-auto rounded shadow-md cursor-pointer"
                        />
                      );
                    })}
                  </div>

                  <p className="text-white text-lg leading-relaxed max-w-screen-lg">
                    {game.description}
                  </p>
                </div>
              </div>

              <div>
                <div>
                  <img
                    src={game.thumbnail}
                    alt={game.short_description}
                    className="mb-2 rounded shadow-md"
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
                      className="py-4 px-8 bg-amber-400 text-zinc-900 flex items-center justify-center rounded uppercase w-full"
                    >
                      Jogar agora
                    </a>

                    <button className="py-2 px-8 bg-transnparent text-zinc-100 flex gap-2 items-center justify-center rounded uppercase border text-xs w-full">
                      <BsPlusCircle size={20} />
                      ADICIONAR AOS FAVORITOS
                    </button>
                  </div>
                </div>

                <div></div>
              </div>
            </div>

            <div className="mt-8"></div>

            <div className="flex mt-8 divide-x-2 divide-zinc-700 gap-8 w-96">
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
              <div>
                <div>
                  <span>
                    <h3>Sistema operacional</h3>
                    <p>
                      {game.minimum_system_requirements?.os
                        ? game.minimum_system_requirements.os
                        : "-"}
                    </p>
                  </span>
                </div>

                <div>
                  <span>
                    <h3>Processador</h3>
                    <p>
                      {game.minimum_system_requirements?.processor
                        ? game.minimum_system_requirements.processor
                        : "-"}
                    </p>
                  </span>
                </div>

                <div>
                  <span>
                    <h3>Memória</h3>
                    <p>
                      {game.minimum_system_requirements?.memory
                        ? game.minimum_system_requirements.memory
                        : "-"}
                    </p>
                  </span>
                </div>

                <div>
                  <span>
                    <h3>Placa de vídeo</h3>
                    <p>
                      {game.minimum_system_requirements?.graphics
                        ? game.minimum_system_requirements.graphics
                        : "-"}
                    </p>
                  </span>
                </div>

                <div>
                  <span>
                    <h3>Armazenamento</h3>
                    <p>
                      {game.minimum_system_requirements?.storage
                        ? game.minimum_system_requirements.storage
                        : "-"}
                    </p>
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Reviews
            </h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="user-avatar1.jpg"
                    alt="User Avatar"
                    className="rounded-full w-10 h-10"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    User 1
                  </h3>
                  <p className="text-zinc-200">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum metus metus, sagittis ut aliquet sed, pulvinar id
                    lacus. Vestibulum ante ipsum primis in faucibus orci luctus
                    et ultrices posuere cubilia curae; Donec sagittis ex eget
                    turpis rutrum tempus.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src="user-avatar2.jpg"
                    alt="User Avatar"
                    className="rounded-full w-10 h-10"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    User 2
                  </h3>
                  <p className="text-zinc-200">
                    Duis volutpat erat et eleifend sagittis. Curabitur
                    condimentum nunc ut metus elementum, eget placerat justo
                    pulvinar. Nulla vel tristique massa.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
