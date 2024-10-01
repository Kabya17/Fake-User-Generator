const faker = require("faker");

// Generate fake data based on region, seed, and error rate
module.exports = (req, res) => {
  const { region = "USA", seed = 42, errorRate = 0 } = req.query;
  faker.seed(Number(seed));  // Seed the random generator

  const records = [];

  for (let i = 0; i < 20; i++) {
    let record = generateRecord(region);
    record = applyErrors(record, errorRate);
    records.push(record);
  }

  res.status(200).json(records);
};

const generateRecord = (region) => {
  const id = faker.datatype.uuid();
  const name = generateName(region);
  const address = generateAddress(region);
  const phone = generatePhone(region);

  return { id, name, address, phone };
};

const generateName = (region) => {
  switch (region) {
    case "Poland":
      return faker.name.firstName("male") + " " + faker.name.lastName();
    case "Georgia":
      return faker.name.firstName("female") + " " + faker.name.lastName();
    case "USA":
    default:
      return faker.name.firstName() + " " + faker.name.lastName();
  }
};

const generateAddress = (region) => {
  return faker.address.city() + ", " + faker.address.streetAddress();
};

const generatePhone = (region) => {
  return faker.phone.phoneNumber();
};

const applyErrors = (record, errorRate) => {
  if (errorRate > 0) {
    // Apply error logic based on the error rate
    if (Math.random() < errorRate / 10) {
      // For example, swap some characters or add noise to the data
      record.name = introduceError(record.name);
    }
  }
  return record;
};

const introduceError = (str) => {
  // Implement random errors (swap characters, add/remove characters)
  if (str.length > 1) {
    const index = Math.floor(Math.random() * str.length);
    const char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    return str.slice(0, index) + char + str.slice(index + 1);
  }
  return str;
};
