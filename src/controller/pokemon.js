const fs = require("fs");

const pokemons = (req, res) => {
  try {
    const dbData = fs.readFileSync("db.json", "utf8");
    const jsonData = JSON.parse(dbData);
    const pokemonData = jsonData.pokemon;
    return res.send({
      success: true,
      message: `Pokemon data fetched!`,
      data: pokemonData,
    });
  } catch (error) {
    console.error("Error reading data from db.json:", error);
    return res.status(400).send({
      success: false,
      message: `Oops.. something is wrong.`,
      data: [],
    });
  }
};

let uniqueID = 0;
let renameStatus = 0;
const catchPokemon = (req, res) => {
  const randomNum = Math.random();
  const successProb = 0.5;

  if (randomNum <= successProb) {
    const { pokemonId, nickname } = req.body;

    const dbData = fs.readFileSync("db.json", "utf8");
    const jsonData = JSON.parse(dbData);

    uniqueID += 1;
    const newPokemon = {
      uniqueID,
      id: pokemonId,
      nickname,
      renameStatus,
    };
    jsonData.pokemon.push(newPokemon);

    fs.writeFileSync("db.json", JSON.stringify(jsonData, null, 2), "utf8");

    return res.send({
      success: true,
      randomNum,
      uniqueID,
      message: `You are so lucky! The Pokemon is catched successfully!`,
    });
  } else {
    return res.status(400).send({
      success: false,
      randomNum,
      message: `Oops... The Pokemon escaped. Please try again.`,
    });
  }
};

const addNickname = (req, res) => {
  const { UID, pokemonName } = req.body;
  console.log("body", req.body);
  try {
    const dbData = fs.readFileSync("db.json", "utf8");
    const jsonData = JSON.parse(dbData);

    const updatedPokemon = jsonData.pokemon.map((pokemon) => {
      if (pokemon.uniqueID === UID) {
        pokemon.nickname = pokemonName;
      }
      return pokemon;
    });

    jsonData.pokemon = updatedPokemon;

    fs.writeFileSync("db.json", JSON.stringify(jsonData, null, 2), "utf8");

    return res.send({
      success: true,
      message: `Nickname updated successfully!`,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `Oops... Something is wrong...`,
    });
  }
};

const checkPrime = (value) => {
  if (value <= 1) {
    return false;
  } else {
    let count = 0;
    for (let i = 2; i <= value; i++) {
      if (value % i === 0) {
        count++;
      }
    }
    if (count === 2) {
      return true;
    } else {
      return false;
    }
  }
};

const releasePokemon = (req, res) => {
  const uniqueID = req.query.id;
  const randomNum = Math.random();
  const result = checkPrime(randomNum);
  if (result) {
    const dbData = fs.readFileSync("db.json", "utf8");
    const jsonData = JSON.parse(dbData);

    const updatedPokemon = jsonData.pokemon.filter((pokemon) => pokemon.id !== uniqueID);
    jsonData.pokemon = updatedPokemon;

    fs.writeFileSync("db.json", JSON.stringify(jsonData, null, 2), "utf8");

    return res.send({
      success: true,
      randomNum,
      result,
      message: `You released the Pokemon!`,
    });
  } else {
    return res.status(400).send({
      success: false,
      randomNum,
      result,
      message: `Oops... The Pokemon release failed.`,
    });
  }
};

let fibo = 0;
const arrFibo = [0, 1];
const generateFibo = () => {
  fibo = arrFibo[arrFibo.length - 1] + arrFibo[arrFibo.length - 2];
  arrFibo.push(fibo);

  return fibo;
};

const renamePokemon = (req, res) => {
  try {
    const { nickname } = req.body;
    const fiboNum = generateFibo();

    const newName = nickname.join(`-${fiboNum}`);
    return res.send({
      success: true,
      newName,
      message: `The Pokemon is renamed succesfully!`,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Oops... something wrong just happened. Please try again.",
    });
  }
};

module.exports = {
  catchPokemon,
  releasePokemon,
  renamePokemon,
  addNickname,
  pokemons,
};
