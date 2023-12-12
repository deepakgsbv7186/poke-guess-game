import { useState } from "react";

export default function FourOptions({
  pokeOptions,
  onSelectOption,
  isCorrect,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (pokemonName) => {
    if (!selectedOption) {
      setSelectedOption(pokemonName);
      onSelectOption(pokemonName);
    }
  };

  return (
    <>
      {pokeOptions?.map((pokemon) => (
        <button
          key={pokemon?.name}
          className={`${
            selectedOption !== pokemon?.name
              ? "bg-slate-400 text-slate-800"
              : "bg-slate-50 text-slate-800"
          } ${
            !selectedOption &&
            "hover:text-slate-100 hover:bg-slate-800 cursor-pointer"
          } w-[100%] font-semibold capitalize p-2 mb-2 rounded-md`}
          onClick={() => handleSelect(pokemon?.name)}
          disabled={selectedOption && selectedOption !== pokemon?.name}
        >
          {pokemon?.name}
        </button>
      ))}
    </>
  );
}
