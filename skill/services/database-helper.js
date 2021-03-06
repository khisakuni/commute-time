const _ = require('lodash');
const Address = require('../address');
const TABLE_NAME = process.env.CT_TABLE_NAME;
const dynasty = require('dynasty')({});

const parseRes = res => _.isNil(res) ? { addresses: [] } : JSON.parse(res.data);

function DatabaseHelper() {}

const table = () => dynasty.table(TABLE_NAME);

DatabaseHelper.prototype.createTable = () => (
  dynasty.describe(TABLE_NAME)
    .catch(err => (
      dynasty.create(TABLE_NAME, {
        key_schema: {
          hash: ['userId', 'string'],
        },
      })
    ))
);

DatabaseHelper.prototype.storeAddress = (userId, address) => (
  table().find(userId).then(res => {
    const data = parseRes(res);
    data.addresses.push(address.toObj());
    return table().insert({ userId, data: JSON.stringify(data) }).catch(console.error);
  }).catch(console.error)
);

DatabaseHelper.prototype.readAddresses = userId => (
  table().find(userId).then((res) => {
    const data = parseRes(res);
    return _.map(data.addresses, address => (new Address(address)));
  }).catch(console.error)
);

module.exports = DatabaseHelper;
