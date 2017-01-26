const Alexa = require('alexa-app');
const intentHandlers = require('./skill/intent-handlers');
const intents = require('./skill/intents');

const skill = new Alexa.app('commute-time');

skill.launch(intentHandlers.launchIntentHandler);

const buildStartAddress = intents.buildStartAddress;
skill.intent(buildStartAddress.name, buildStartAddress.params, intentHandlers.buildStartAddress);

const buildEndAddress = intents.buildEndAddress;
skill.intent(buildEndAddress.name, buildEndAddress.params, intentHandlers.buildEndAddress);

module.exports = skill;
