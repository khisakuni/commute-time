const Address = require('./address');

const inquireStartAddress = () => {
  const address = new Address(); // Using this to get proper examples, etc for missing fields.
  const missing = address.missingFields()[0];
  return `${missing.prompt}. For example, say, "going to ${missing.example}"`;
};

const listSavedAddresses = addressNames => (
  `${addressNames.join(', ')}`
);

// TODO: can we get a better name pls?
const listAddressesThenInquire = addressNames => (
  `Are you starting from ${listSavedAddresses(addressNames)}, or from a new place?`
);

module.exports = {
  inquireStartAddress,
  listSavedAddresses,
  listAddressesThenInquire,
};
