import { getGame } from "@/actions/get-game";
import React from "react";

interface GamePageProps {
  params: {
    gameId: string;
  };
}

const GamePage = async ({ params }: GamePageProps) => {
  const game = await getGame(params.gameId);

  return (
    <div>
      <h1>{game.title}</h1>

      <img src={game.thumbnail} alt={game.title} />

      <p>{game.short_description}</p>
    </div>
  );
};

export default GamePage;
