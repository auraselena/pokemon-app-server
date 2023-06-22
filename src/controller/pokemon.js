const catchPokemon = (req, res) => {
  const randomNum = Math.random();
  const successProb = 0.5;

  if (randomNum <= successProb) {
    const { pokemonId, nickname } = req.body;

    return res.send({
      success: true,
      message: `You are so lucky! The Pokemon is catched successfully!`,
    });
  } else {
    return res.status(400).send({
      success: false,
      message: `Oops... The Pokemon escaped. Please try again.`,
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
  const pokemonId = req.params;
  const randomNum = Math.random();
  const result = checkPrime(randomNum);

  if (result) {
    return res.send({
      success: true,
      result,
      message: `You released the Pokemon!`,
    });
  } else {
    return res.status(400).send({
      success: true,
      result,
      message: `Oops... The Pokemon release failed. Please try again.`,
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
        message: `The Pokemon is renamed succesfully!` });
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
};
