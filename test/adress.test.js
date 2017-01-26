const expect = require('chai').expect;
const Address = require.main.require('skill/address');

describe('Address', function() {
  function testProp(name, value) {
    const params = {};
    params[name] = value;
    const subject = new Address(params);

    expect(subject[name]).to.eql(value);
  };

  it('can have a building number', function() {
    testProp('buildingNumber', '1234');
  });

  it('can have a street', function() {
    testProp('street', 'Venice blvd');
  });

  it('can have a city', function() {
    testProp('city', 'Los Angeles');
  });

  it('can have a state', function() {
    testProp('city', 'California');
  });

  it('can have a name', function() {
    testProp('name', 'home');
  });

  describe('#isComplete', function() {
    it('returns false if fields are missing', function() {
      const subject = new Address();

      expect(subject.isComplete()).to.eql(false);
    });

    it('returns true if all fields present', function() {
      const subject = new Address({
        buildingNumber: '1234',
        street: 'Sunset blvd',
        city: 'Los Angeles',
        state: 'California',
        name: 'home',
      });

      expect(subject.isComplete()).to.eql(true)
    });
  });

  describe('#missingFields', function() {
    it('returns fields that are missing', function() {
      const subject = new Address({
        buildingNumber: '1234',
        street: 'Sunset blvd',
        city: 'Los Angeles',
        name: 'home',
      });
      const expected = [{
        name: 'state',
        example: 'California',
        prompt: 'Tell me the state of the place',
      }];

      expect(subject.missingFields()).to.eql(expected);
    });
  });

  describe('#formatAddress', function() {
    it('returns formatted string address string', function() {
      const subject = new Address({
        buildingNumber: '1234',
        street: 'Sunset blvd',
        city: 'Los Angeles',
        state: 'California',
        name: 'home',
      });
      const expected = `${subject.buildingNumber} ${subject.street}, ${subject.city}, ${subject.state}`;

      expect(subject.formatAddress()).to.eql(expected);
    });
  });
});
