const express = require("express");
const route = express.Router();
const { pokemonController } = require("../controller");

route.post("/catch", pokemonController.catchPokemon);
route.delete("/release", pokemonController.releasePokemon);
route.post("/rename", pokemonController.renamePokemon);
route.post("/add-name", pokemonController.addNickname);
route.get("/pokemon", pokemonController.pokemons)

module.exports = route;
