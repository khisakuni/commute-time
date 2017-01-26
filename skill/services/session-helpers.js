const _ = require('lodash');
const SESSION_KEY = process.env.SESSION_KEY || 'commute-time-session';

function updateSessionData(sessionData, slotValues) {
  _.each(slotValues, (slotValue) => {
    const keys = _.keys(slotValue)
    _.each(keys, (key) => {
      sessionData[key] = _.isNil(sessionData[key]) ? {} : sessionData[key];
      if (_.isObject(slotValue[key])) {
        _.merge(sessionData[key], slotValue[key])
      } else {
        sessionData[key] = slotValue[key]
      }
    });
  });
  return sessionData;
}

function formatSlotValues(slotValues) {
  return _.compact(_.map(slotValues, (slotValue) => {
    const formatted = {};
    const key = _.keys(slotValue)[0];
    const value = _.values(slotValue)[0];
    if (_.isEmpty(value)) return;
    const words = _.words(key);
    const prefix = words.shift();
    const name = _.camelCase(words.join(' '));
    const sub = {};
    sub[name] = value;
    formatted[prefix] = sub;
    return formatted;
  }));
}

function getSessionData(req) {
  const data = req.session(SESSION_KEY);
  return data ? data : { start: {}, end: {} };
}

module.exports = {
  updateSessionData,
  formatSlotValues,
  getSessionData,
};
