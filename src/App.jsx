import { useEffect, useState } from "react";
import { fetchPokemon } from "./PokemonService";
import GameScreen from "./game/GameScreen";
export default function App() {
  return (
    <>
      <GameScreen />
    </>
  );
}
