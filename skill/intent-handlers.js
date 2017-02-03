const _ = require('lodash');
const responses = require('./responses');
const intents = require('./intents');
const sessionHelpers = require('./services/session-helpers');
const addressHelpers = require('./services/address-helpers');
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
      res.say(responses.listAddressesThenInquire(names, 'start')).shouldEndSession(false);
    }
    res.send();
  });
  return false; // async intent handler
};

const buildStartAddress = (req, res) => {
  const slotNames = _.keys(intents.buildStartAddress.params.slots);
  const addressesData = addressHelpers.updateSessionAddresses(slotNames, req);
  var startAddress = addressesData.startAddress;
  const endAddress = addressesData.endAddress;
  const sessionData = addressesData.sessionData;

  dbHelper.readAddresses(sessionHelpers.getUserId(req)).then((addresses) => {

    // if user requests name, find and fill in address with that name
    if (req.slot('startName')) {
      const address = _.find(addresses, address => address.name === req.slot('startName'));
      if (address) {
        startAddress = address;
        sessionData.start = startAddress.toObj();
      };
    }

    if (startAddress.isComplete() && endAddress.isComplete()) {
      res.say('both addresses complete').shouldEndSession(true);
      // TODO: calculate travel time
    } else if (startAddress.isComplete()) {
      if (!addressHelpers.findAddress(addresses, startAddress)) {
        dbHelper.storeAddress(sessionHelpers.getUserId(req), startAddress);
      }

      const names = _.map(addresses, address => address.name);
      if (_.isEmpty(names)) {
        res.say(responses.inquireEndAddress()).shouldEndSession(false);
      } else {
        res.say(responses.listAddressesThenInquire(names, 'end')).shouldEndSession(false);
      }
    } else {
      res.say(responses.inquireStartAddress(startAddress)).shouldEndSession(false);
    }

    res.session(SESSION_KEY, sessionData);
    res.send();
  });

  return false; // async intent handler
};

const buildEndAddress = (req, res) => {
  const slotNames = _.keys(intents.buildEndAddress.params.slots);
  const addressesData = addressHelpers.updateSessionAddresses(slotNames, req);
  const startAddress = addressesData.startAddress;
  var endAddress = addressesData.endAddress;
  const sessionData = addressesData.sessionData;

  dbHelper.readAddresses(sessionHelpers.getUserId(req)).then((addresses) => {

    // if user requests name, find and fill in address with that name
    if (req.slot('endName')) {
      const address = _.find(addresses, address => address.name === req.slot('endName'));
      if (address) {
        endAddress = address;
        sessionData.end = endAddress.toObj();
      }
    }

    if (startAddress.isComplete() && endAddress.isComplete()) {
      if (!addressHelpers.findAddress(addresses, endAddress)) {
        dbHelper.storeAddress(sessionHelpers.getUserId(req), endAddress);
      }
      // TODO: calculate travel time
      res.say('both addresses complete').shouldEndSession(true);
    } else if (startAddress.isComplete()) {
      res.say(responses.inquireEndAddress(endAddress)).shouldEndSession(false);
    } else {
      const names = _.map(addresses, address => address.name);
      if (_.isEmpty(names)) {
        res.say(responses.inquireStartAddress()).shouldEndSession(false);
      } else {
        res.say(responses.listAddressesThenInquire(names, 'start')).shouldEndSession(false);
      }
    }

    res.session(SESSION_KEY, sessionData);
    res.send();
  });

  return false; // async intent handler
};

module.exports = {
  launchIntentHandler,
  buildStartAddress,
  buildEndAddress,
};
