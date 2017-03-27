const Field = require('./field');

class FormSchema {
  _findFieldByName(name) {
    let fieldIdx = false, idx = 0;

    while (!fieldIdx && idx < this._form.fields.length) {
      if (this._form.fields[idx].name === name) {
        fieldIdx = idx;
      }
      idx++;
    }

    return fieldIdx;
  }

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

  removeField(fieldIdx) {
    if (this._form.fields[fieldIdx]) {
      this._form.fields.splice(fieldIdx, 1);
      return true;
    } else {
      return false;
    }
  }
}

module.exports = FormSchema;
