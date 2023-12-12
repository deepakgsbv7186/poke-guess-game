export default function PokeImg({ displayPokemon }) {
  return (
    <>
      <img
        src={displayPokemon?.imgURL}
        alt={displayPokemon?.name}
        width={"80%"}
        height={"80%"}
        className="object-contain"
      />
    </>
  );
}
