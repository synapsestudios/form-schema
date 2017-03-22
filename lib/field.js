class Field{
  constructor(name, type) {
    if (name && typeof name === 'object') {
      Object.assign(this, name);
    } else {
      this.name = name;
      this.type = type;
    }

  }


}

module.exports = Field;
