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

  addField(fieldName, element) {
    this._form.fields.push(new Field(fieldName, element));
  }
}

module.exports = FormSchema;
