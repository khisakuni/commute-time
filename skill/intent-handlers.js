const _ = require('lodash');
const responses = require('./responses');
const intents = require('./intents');
const sessionHelpers = require('./services/session-helpers');
const buildAddressHelpers = require('./services/build-address-helpers');
const Address = require('./address');
const SESSION_KEY = process.env.CT_SESSION_KEY;
const DatabaseHelper = require('./services/database-helper');
const dbHelper = new DatabaseHelper();

const launchIntentHandler = (req, res) => {
  dbHelper.readAddresses(sessionHelpers.getUserId(req)).then((addresses) => {
    if (_.isEmpty(addresses)) {
      res.say(responses.inquireStartAddress()).shouldEndSession(false);
    } else {
      const names = _.map(addresses, address => address.name);
      res.say(responses.listAddressesThenInquire(names)).shouldEndSession(false);
    }
    res.send();
  });
  return false; // async intent handler
};

const buildStartAddress = (req, res) => {
  const slotNames = _.keys(intents.buildStartAddress.params.slots);
  const addressesData = buildAddressHelpers.updateSessionAddresses(slotNames, req);
  const startAddress = addressesData.startAddress;
  const endAddress = addressesData.endAddress;
  const sessionData = addressesData.sessionData;

  // TODO: fill these in
  if (startAddress.isComplete() && endAddress.isComplete()) {
    res.say('both addresses complete').shouldEndSession(false);
  } else if (startAddress.isComplete()) {
    dbHelper.storeAddress(sessionHelpers.getUserId(req), startAddress);
    res.say('starting address complete. Need end address').shouldEndSession(false);
  } else {
    res.say('starting address incomplete').shouldEndSession(false);
  }

  res.session(SESSION_KEY, sessionData);
};

const buildEndAddress = (req, res) => {
  const slotNames = _.keys(intents.buildEndAddress.params.slots);
  const addressesData = buildAddressHelpers.updateSessionAddresses(slotNames, req);
  const startAddress = addressesData.startAddress;
  const endAddress = addressesData.endAddress;
  const sessionData = addressesData.sessionData;

  // TODO: fill these in
  if (startAddress.isComplete() && endAddress.isComplete()) {
    dbHelper.storeAddress(sessionHelpers.getUserId(req), endAddress);
    res.say('both addresses complete').shouldEndSession(false);
  } else if (startAddress.isComplete()) {
    res.say('starting address complete. Need end address').shouldEndSession(false);
  } else {
    res.say('starting address incomplete').shouldEndSession(false);
  }

  res.session(SESSION_KEY, sessionData);
}

module.exports = {
  launchIntentHandler,
  buildStartAddress,
  buildEndAddress,
};
