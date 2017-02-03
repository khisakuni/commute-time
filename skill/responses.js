const Address = require('./address');

const inquireStartAddress = (address) => {
  address = (address || new Address());
  const missing = address.missingFields()[0];
  return `${missing.prompt} you're starting from. For example, say, "from ${missing.example}"`;
};

const inquireEndAddress = (address) => {
  address = (address || new Address());
  const missing = address.missingFields()[0];
  return `${missing.prompt} you're going to. For example, say, "to ${missing.example}"`;
}

const listSavedAddresses = addressNames => (
  `${addressNames.join(', ')}`
);

const listAddressesThenInquire = (addressNames, direction) => {
  const s = direction === 'start' ? 'starting from' : 'going to';
  return `Are you ${s} ${listSavedAddresses(addressNames)}, or ${s} a new place?`
};

module.exports = {
  inquireStartAddress,
  inquireEndAddress,
  listSavedAddresses,
  listAddressesThenInquire,
};
