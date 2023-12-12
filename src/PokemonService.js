import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemon = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${Math.floor(Math.random() * 1000) + 1}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
  }
};
