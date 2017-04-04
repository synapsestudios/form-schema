const newField = require('./newField');
const Immutable = require('immutable');

const FormSchema = function(schema) {
  this._validatorPriority = [];
  this._validators = {};

  this._form = Immutable.fromJS({
    name: '',
    fields: [],
  });

  if (schema) {
    this._initialize(schema);
  }
};

FormSchema.prototype._initialize = function(schema) {
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

FormSchema.prototype.getSchemaObject = function() {
  return this._form.toJS();
}

FormSchema.prototype.getImmutableSchema = function() {
  return this._form;
}

FormSchema.prototype.serialize = function() {
  return JSON.stringify(this._form.toJS());
}

FormSchema.prototype.addField = function(type) {
  let fields = this._form.get('fields');
  fields = fields.push(newField(type));
  this._form = this._form.set('fields', fields);
}

FormSchema.prototype.updateField = function(fieldIdx, field) {
  let fields = this._form.get('fields');
  if (fields.get(fieldIdx)) {
    field = Immutable.Iterable.isIterable(field) ? field : Immutable.fromJS(field);
    fields = fields.splice(fieldIdx, 1, field);
    this._form = this._form.set('fields', fields);
  } else {
    return false;
  }
}

FormSchema.prototype.removeField = function(fieldIdx) {
  if (this._form.getIn(['fields', fieldIdx])) {
    let fields = this._form.get('fields');
    fields = fields.splice(fieldIdx, 1);
    this._form = this._form.set('fields', fields);

    return true;
  } else {
    return false;
  }
}


FormSchema.prototype.registerValidator = function(validationAdapter) {
  if (!validationAdapter.name) {
    throw new Error('Form schema validation adapter name must be provided');
  }

  this._validators[validationAdapter.name] = validationAdapter;
  this._validatorPriority.push(this._validators[validationAdapter.name]);
}

FormSchema.prototype.validate = function(validatorName) {
  if (this._validatorPriority.length) {
    const validator = validatorName ? this._validators[validatorName] : this._validatorPriority[0];

    return new Promise((resolve, reject) => {
      const promises = this._form.get('fields').map(field => {
        if (validator.getFieldTypes().indexOf(field.get('type')) !== -1) {
          const fieldValidator = validator[field.get('type')];
          return fieldValidator ? fieldValidator.bind(validator)(field) : Promise.resolve(false);
        } else {
          return Promise.resolve([`${field.get('type')} is not supported`]);
        }
      });

      if (!promises.size) {
        resolve(true);
      } else {
        Promise.all(promises)
          .then(results => {
            let isValid = true;
            for (var i = 0; i < results.length; i++) {
              const fieldErrors = results[i];
              isValid = fieldErrors !== false ? false : isValid;

              const field = this._form.getIn(['fields', i]).set('error', fieldErrors);
              this.updateField(i, field);
            }

            resolve(isValid);
          });
      }
    });
  } else {
    return Promise.resolve(true);
  }
}

module.exports = FormSchema;
