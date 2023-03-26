const { collection } = require('../db/mongo.js');

const getMonkeyByName = async (name) => {
  const monkey = await collection.findOne({ name });
  return monkey;
}

const getAllMonkeys = async () => {
  const monkeys = await collection.find({}).toArray();
  return monkeys;
}

const createMonkey = async (name) => {
  try {
    const monkey = { name };
    const result = await collection.insertOne(monkey);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getMonkeyByName,
  getAllMonkeys,
  createMonkey,
};