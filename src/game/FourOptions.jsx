import { useState } from "react";

export default function FourOptions({
  pokeOptions,
  onSelectOption,
  correctOption,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (pokemonName) => {
    setSelectedOption(pokemonName);
    onSelectOption(pokemonName);
  };

  const getButtonStyle = (pokemonName) => {
    if (selectedOption === correctOption?.name) {
      return pokemonName === correctOption?.name
        ? "bg-green-400 text-white"
        : "bg-slate-500 text-slate-800";
    } else if (selectedOption && pokemonName === correctOption?.name) {
      return "bg-green-400 text-white";
    } else if (selectedOption === pokemonName) {
      return "bg-red-400 text-white";
    } else if (selectedOption !== null) {
      return "bg-slate-500 text-slate-800";
    } else {
      return "bg-slate-50 text-slate-800 hover:text-slate-100 hover:bg-slate-800 cursor-pointer";
    }
  };

  return (
    <>
      {pokeOptions?.map((pokemon) => (
        <button
          key={pokemon?.name}
          className={`w-[100%] font-semibold capitalize p-2 mb-2 rounded-md ${getButtonStyle(
            pokemon?.name
          )}`}
          onClick={() => handleSelect(pokemon?.name)}
          disabled={selectedOption !== null}
        >
          {pokemon?.name}
        </button>
      ))}
    </>
  );
}
