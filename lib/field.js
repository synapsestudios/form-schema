class Field{
  constructor(type) {
    this._validateInitialization(type);

    if (type && typeof type === 'object') {
      Object.assign(this, type);
    } else {
      this.type = type;
    }
  }

  _validateInitialization(type) {
    let localType = type;
    if (type && typeof type === 'object') {
      localType = type.type;
    }

    if (!localType) {
      throw new Error('Field type is required');
    }
  }
}

module.exports = Field;
