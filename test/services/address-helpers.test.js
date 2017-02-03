const expect = require('chai').expect;
const addressHelpers = require.main.require('skill/services/address-helpers');
const Address = require.main.require('skill/address');

describe('addressHelpers', function() {
  describe('findAddress', function() {
    it('returns address if in list', function() {
      const address = new Address({ name: 'home' });
      const result = addressHelpers.findAddress([address], address);

    expect(result).to.eql(address);
    });

    it('returns undefined if not in list', function() {
      const notMatch = new Address({ name: 'home' });
      const address = new Address({ name: 'work' })
      const result = addressHelpers.findAddress([address], notMatch);

      expect(result).to.eql(undefined);
    });
  });
});
