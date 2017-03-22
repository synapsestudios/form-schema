const Field = require('./field');

class FormSchema{
  constructor() {
    this._form = {
      name: '',
      fields: [],
    };
  }

  getFormSchema() {
    return this._form;
  }

  serialize() {
    return JSON.stringify(this._form);
  }

  addField(fieldName, type) {
    this._form.fields.push(new Field(fieldName, type));
  }
}

module.exports = FormSchema;
