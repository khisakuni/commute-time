const _ = require('lodash');
const responses = require('./responses');
const intents = require('./intents');
const sessionHelpers = require('./services/session-helpers');
const buildAddressHelpers = require('./services/build-address-helpers');
const Address = require('./address');
const SESSION_KEY = process.env.CT_SESSION_KEY;

const launchIntentHandler = (req, res) => {
  // TODO: try to load addresses
  res.say(responses.inquireStartAddress()).shouldEndSession(false)
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
    res.say('starting address complete. Need end address').shouldEndSession(false);
  } else {
    res.say('startgin address incomplete').shouldEndSession(false);
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
    res.say('both addresses complete').shouldEndSession(false);
  } else if (startAddress.isComplete()) {
    res.say('starting address complete. Need end address').shouldEndSession(false);
  } else {
    res.say('startgin address incomplete').shouldEndSession(false);
  }

  res.session(SESSION_KEY, sessionData);
}

module.exports = {
  launchIntentHandler,
  buildStartAddress,
  buildEndAddress,
};
