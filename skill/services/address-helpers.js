const _  = require('lodash');
const sessionHelpers = require('./session-helpers');
const Address = require('../address');

const updateSessionAddresses = (slotNames, req) => {
  const slots = slotNames.map(name => {
    const obj = {};
    obj[name] = req.slot(name);
    return obj;
  });
  const slotValues = sessionHelpers.formatSlotValues(slots);
  const sessionData = sessionHelpers.getSessionData(req);
  const addresses = sessionHelpers.updateSessionData(sessionData, slotValues);
  const startAddress = new Address(addresses.start);
  const endAddress = new Address(addresses.end);

  return { sessionData: addresses, startAddress, endAddress };
};

const findAddress = (addresses, address) => _.find(addresses, address.eql);

module.exports = {
  updateSessionAddresses,
  findAddress,
};
