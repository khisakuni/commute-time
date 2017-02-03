const intents = {
  buildStartAddress: {
    name: 'buildStartAddressIntent',
    params: {
      slots: {
        startName: 'NAMED_PLACE',
        startBuildingNumber: 'AMAZON.NUMBER',
        startStreet: 'AMAZON.StreetAddress',
        startCity: 'AMAZON.US_CITY',
        startState: 'AMAZON.US_STATE',
      },
      utterances: [
        'from a new place',
        'from {-|startName}',
        'from {-|startBuildingNumber}',
        'from {-|startStreet}',
        'from {-|startCity}',
        'from {-|startState}',
      ],
    },
  },
  buildEndAddress: {
    name: 'buildEndAddressIntent',
    params: {
      slots: {
        endName: 'NAMED_PLACE',
        endBuildingNumber: 'AMAZON.NUMBER',
        endStreet: 'AMAZON.StreetAddress',
        endCity: 'AMAZON.US_CITY',
        endState: 'AMAZON.US_STATE',
      },
      utterances: [
        'to a new place',
        'to {-|endName}',
        'to {-|endBuildingNumber}',
        'to {-|endStreet}',
        'to {-|endCity}',
        'to {-|endState}',
      ],
    },
  },
};

module.exports = intents;
