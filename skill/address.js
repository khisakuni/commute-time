const _ = require('lodash');

const buildAddressField = (name, prompt, example) => ({ name, prompt, example });
const buildPrompt = name => `Tell me the ${name} of the place`;

function Address(params) {
  params = (params || {});
  this.buildingNumber = params.buildingNumber;
  this.street = params.street;
  this.city = params.city;
  this.state = params.state;
  this.name = params.name;

  this.isComplete = () => {
    const required = [this.buildingNumber, this.street, this.city, this.state, this.name];
    return required.length === _.compact(required).length;
  }

  this.missingFields = () => {
    const required = [
      buildAddressField('name', buildPrompt('name'), 'Work. Or, home.'),
      buildAddressField('buildingNumber', buildPrompt('building number'), 'fifteen twenty eight'),
      buildAddressField('street', buildPrompt('street'), 'Sunset Boulevard'),
      buildAddressField('city', buildPrompt('city'), 'Los Angeles'),
      buildAddressField('state', buildPrompt('state'), 'California'),
    ];
    return _.compact(required.map(field => this[field.name] ? '' : field));
  }

  this.formatAddress = () => (
    `${this.buildingNumber} ${this.street}, ${this.city}, ${this.state}`
  );

  this.toObj = () => ({
    name: this.name,
    buildingNumber: this.buildingNumber,
    street: this.street,
    city: this.city,
    state: this.state,
  });

  this.eql = address => {
    const sameName = this.name === address.name;
    const sameBuildingNumber = this.buildingNumber === address.buildingNumber;
    const sameStreet = this.street === address.street;
    const sameCity = this.city === address.city;
    const sameState = this.state === address.state;
    return sameName && sameBuildingNumber && sameStreet && sameCity && sameState;
  };
};

module.exports = Address;
