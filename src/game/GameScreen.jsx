import React, { useCallback, useEffect, useState } from "react";
import PokeImg from "./PokeImg";
import FourOptions from "./FourOptions";
import { fetchPokemon } from "../PokemonService";

// on correct increase by points and on wrong decrease by points
const ON_SELECT = 10;
// if user skip the current, points deduct from the score
const ON_SKIP = 5;

export default function GameScreen() {
  const [loading, setLoading] = useState(true);
  const [pokeOptions, setPokeOptions] = useState([]);
  const [displayPokemon, setDisplayPokemon] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [points, setPoints] = useState(0);

  const getRandomPokeName = async () => {
    const response = await fetchPokemon();
    return {
      name: response?.name,
      imgURL: response?.sprites?.other?.["official-artwork"]?.front_default,
    };
  };
  const getOptions = async () => {
    setSelectedOption(null);
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
      setPoints((prev) => prev + ON_SELECT);
    } else {
      setPoints((prev) => prev - ON_SELECT);
    }
    setTimeout(() => {
      getOptions();
    }, 3000);
  };
  useEffect(() => {
    getOptions();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex flex-1 h-[100vh] justify-center items-center">
          <h2 className="font-bold text-2xl text-white">Pokemon...</h2>
        </div>
      ) : (
        <>
          <div className="m-2">
            <h2 className="bg-sky-400 p-2 font-bold capitalize text-center text-white text-xl rounded-md">
              Guess the Pokemon
            </h2>
            <h3
              className={`${
                points < 0
                  ? "bg-red-400"
                  : points === 0
                  ? "bg-slate-400"
                  : "bg-green-400"
              } font-medium text-white text-center my-2 p-1 rounded-md`}
            >
              Points earned: {points}
            </h3>
            <div className="flex h-[80vh] mt-2 flex-col md:flex-row justify-center">
              <div className="flex flex-1 justify-center items-center">
                <PokeImg displayPokemon={displayPokemon} />
              </div>
              <div className="flex flex-1 items-center flex-col">
                <FourOptions
                  pokeOptions={pokeOptions}
                  onSelectOption={handleSelection}
                  correctOption={displayPokemon}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <button
                  disabled={selectedOption}
                  onClick={() => {
                    getOptions(), setPoints((prev) => prev - ON_SKIP);
                  }}
                  className={`${
                    selectedOption ? "bg-slate-600" : "bg-sky-400"
                  } text-white w-[100%] p-2 mt-4 rounded-md border border-sky-400`}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
