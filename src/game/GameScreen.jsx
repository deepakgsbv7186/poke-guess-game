import React, { useCallback, useEffect, useState } from "react";
import PokeImg from "./PokeImg";
import FourOptions from "./FourOptions";
import { fetchPokemon } from "../PokemonService";

export default function GameScreen() {
  const [loading, setLoading] = useState(true);
  const [pokeOptions, setPokeOptions] = useState([]);
  const [displayPokemon, setDisplayPokemon] = useState(null);
  const [points, setPoints] = useState(0);

  const getRandomPokeName = async () => {
    const response = await fetchPokemon();
    return {
      name: response?.name,
      imgURL: response?.sprites?.other?.["official-artwork"]?.front_default,
    };
  };
  const getOptions = async () => {
    const options = await Promise.all(
      Array(4)
        .fill()
        .map(() => getRandomPokeName())
    );
    if (!options) {
      setLoading(true);
    } else {
      setLoading(false);
      const randomIndex = Math.floor(Math.random() * 4);
      setDisplayPokemon(options[randomIndex]);
      setPokeOptions(options);
    }
  };
  const handleSelection = (selectedName) => {
    if (selectedName === displayPokemon?.name) {
      setPoints((prev) => prev + 10);
      console.log(selectedName, "Correct", displayPokemon);
    } else {
      setPoints((prev) => prev - 10);
      console.log(selectedName, "Wrong", displayPokemon);
    }
  };
  useEffect(() => {
    getOptions();
  }, []);
  console.log("pokeOptionspokeOptions", pokeOptions);
  return (
    <>
      {loading ? (
        <div className="flex flex-1 h-[100vh] justify-center items-center">
          <h2 className="font-bold text-2xl text-white">Loading</h2>
        </div>
      ) : (
        <>
          <div className="m-2">
            <h2 className="bg-sky-300 p-2 font-bold capitalize text-center text-white text-xl rounded-md">
              Guess the Pokemon
            </h2>
            <h3
              className={`${
                points < 0
                  ? "text-red-400"
                  : points === 0
                  ? "text-white"
                  : "text-green-400"
              } font-medium`}
            >
              Points earned: {points}
            </h3>
            <div className="flex h-[90vh] mt-2 flex-col md:flex-row justify-center">
              <div className="flex flex-1 justify-center items-center">
                <PokeImg displayPokemon={displayPokemon} />
              </div>
              <div className="flex flex-1 items-center flex-col">
                <FourOptions
                  pokeOptions={pokeOptions}
                  onSelectOption={handleSelection}
                  correctOption={displayPokemon}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
