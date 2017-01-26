const expect = require('chai').expect;
const sessionHelpers = require.main.require('skill/services/session-helpers');

describe('updateSessionData', function() {
  it('should update sessionData with empty slotValues', function() {
    const sessionData = {};
    const expected = {};
    const slotValues = [expected];

    expect(sessionHelpers.updateSessionData(sessionData, slotValues)).to.eql(expected);
  });

  it('should update sessionData with slotValues', function() {
    const sessionData = {};
    const expected = { foo: 'bar' };
    const slotValues = [expected];

    expect(sessionHelpers.updateSessionData(sessionData, slotValues)).to.eql(expected);
  });

  it('should update sessionData with multiple slotValues', function() {
    const sessionData = {};
    const expected = { foo: { bar: 'baz', bam: 'wee' } };
    const slotValues = [{ foo: { bar: 'baz' } }, { foo: { bam: 'wee' } }];

    expect(sessionHelpers.updateSessionData(sessionData, slotValues)).to.eql(expected);
  });
});

describe('formatSlotValues', function() {
  it('should use prefix as key to make object', function() {
    const prefix = 'start';
    const name = `${prefix}Street`;
    const value = 'bla';
    const slotValues = {}
    slotValues[name] = value;
    const expected = [{ start: { street: value } }];

    expect(sessionHelpers.formatSlotValues([slotValues])).to.eql(expected);
  });

  it('should format each value in object', function() {
    const expected = [{ start: { street: 'bla'} }, { start: { city: 'bar' } }];
    const slotValues = [{ startStreet: 'bla' }, { startCity: 'bar' }];

    expect(sessionHelpers.formatSlotValues(slotValues)).to.eql(expected);
  });

  it('should not include empty values', function() {
    const expected = [{ start: { street: 'bla' } }];
    const slotValues = [{ startStreet: 'bla' }, { startCity: '' }];

    expect(sessionHelpers.formatSlotValues(slotValues)).to.eql(expected);
  });
});
