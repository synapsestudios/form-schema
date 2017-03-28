const newField = require('./newField');
const Immutable = require('immutable');

class FormSchema {
  constructor() {
    this._form = Immutable.fromJS({
      name: '',
      fields: [],
    });
  }

  getFormSchema() {
    return this._form.toJS();
  }

  serialize() {
    return JSON.stringify(this._form.toJS());
  }

  addField(type) {
    let fields = this._form.get('fields');
    fields = fields.push(newField(type));
    this._form = this._form.set('fields', fields);
  }

  removeField(fieldIdx) {
    if (this._form.getIn(['fields', fieldIdx])) {
      let fields = this._form.get('fields');
      fields = fields.splice(fieldIdx, 1);
      this._form = this._form.set('fields', fields);

      return true;
    } else {
      return false;
    }
  }
}

module.exports = FormSchema;
