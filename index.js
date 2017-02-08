const Alexa = require('alexa-app');
const intentHandlers = require('./skill/intent-handlers');
const intents = require('./skill/intents');
const DatabaseHelper = require('./skill/services/database-helper');
const dbHelper = new DatabaseHelper();

const skill = new Alexa.app('commute-time');

skill.pre = (req, res, type) => dbHelper.createTable();

skill.launch(intentHandlers.launchIntentHandler);

// const buildStartAddress = intents.buildStartAddress;
// skill.intent(buildStartAddress.name, buildStartAddress.params, intentHandlers.buildStartAddress);
//
// const buildEndAddress = intents.buildEndAddress;
// skill.intent(buildEndAddress.name, buildEndAddress.params, intentHandlers.buildEndAddress);

const buildAddress = intents.buildAddress;
skill.intent(buildAddress.name, buildAddress.params, intentHandlers.buildAddress);

module.exports = skill;
