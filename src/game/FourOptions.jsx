export default function FourOptions({
  pokeOptions,
  onSelectOption,
  correctOption,
  selectedOption,
  setSelectedOption,
}) {
  // const minLength = 5;
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
  // const sliceLongName = (pokeName) =>
  //   pokeName.length > minLength
  //     ? `${pokeName.slice(0, minLength - 1)}...`
  //     : pokeName;
  return (
    <div className="flex flex-wrap justify-between items-center h-[100%] w-[100%]">
      {pokeOptions?.map((pokemon) => (
        <button
          key={pokemon?.name}
          className={`w-[49%] font-semibold capitalize p-2 mb-2 rounded-md ${getButtonStyle(
            pokemon?.name
          )}`}
          onClick={() => handleSelect(pokemon?.name)}
          disabled={selectedOption !== null}
        >
          {pokemon?.name}
          {/* {sliceLongName(pokemon?.name)} */}
        </button>
      ))}
    </div>
  );
}
