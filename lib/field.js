class Field{
  constructor(name, type) {
    this._validateInitialization(name, type);

    if (name && typeof name === 'object') {
      Object.assign(this, name);
    } else {
      this.name = name;
      this.type = type;
    }
  }

  _validateInitialization(name, type) {
    let localName = name, localType = type;
    if (name && typeof name === 'object') {
      localName = name.name;
      localType = name.type;
    }

    if (!localName) {
      throw new Error('Field name is required');
    }
  }
}

module.exports = Field;
