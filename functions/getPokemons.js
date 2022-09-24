const getPokemons = (message, client) => {
  const axios = require("axios");
  const limit = message.body.split(" ")[1];
  axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    .then((response) => {
      client.sendMessage(
        message.from,
        response.data.results.reduce((acc, pokemon) => {
          acc += " " + pokemon.name;
          return acc;
        }, "")
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = getPokemons;
