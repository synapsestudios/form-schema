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
}

module.exports = FormSchema;
