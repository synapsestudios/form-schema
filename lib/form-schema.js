const newField = require('./newField');
const Immutable = require('immutable');

class FormSchema {
  constructor(schema) {
    this._validatorPriority = [];
    this._validators = {};

    this._form = Immutable.fromJS({
      name: '',
      fields: [],
    });

    if (schema) {
      this._initialize(schema);
    }
  }

  _initialize(schema) {
    // if schema is a string then try and JSON.parse it
    try {
      schema = typeof schema === 'string' ? JSON.parse(schema) : schema;
    } catch(e) {
      throw new Error('Initializing FormSchema with invalid json');
    }

    // if schema is not immutable, make it immutable
    schema = Immutable.Iterable.isIterable(schema) ? schema : Immutable.fromJS(schema);

    this._form.set('name', schema.get('name'));
    schema.get('fields').forEach(field => {
      this.addField(field);
    });
  }

  getSchemaObject() {
    return this._form.toJS();
  }

  getImmutableSchema() {
    return this._form;
  }

  serialize() {
    return JSON.stringify(this._form.toJS());
  }

  addField(type) {
    let fields = this._form.get('fields');
    fields = fields.push(newField(type));
    this._form = this._form.set('fields', fields);
  }

  updateField(fieldIdx, field) {
    let fields = this._form.get('fields');
    if (fields.get(fieldIdx)) {
      field = Immutable.Iterable.isIterable(field) ? field : Immutable.fromJS(field);
      fields = fields.splice(fieldIdx, 1, field);
      this._form = this._form.set('fields', fields);
    } else {
      return false;
    }
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

  registerValidator(validationAdapter) {
    this._validators[validationAdapter.name] = validationAdapter;
    this._validatorPriority.push(this._validators[validationAdapter.name]);
  }
}

module.exports = FormSchema;
