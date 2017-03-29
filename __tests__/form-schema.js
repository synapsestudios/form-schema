const FormSchema = require('../lib/form-schema');
const Immutable = require('immutable');

describe('initialization', () => {
  const testSchema = {
    name: '',
    fields: [{
      type: 'text',
      label: 'Text Field',
    }]
  };

  test('form initializes without error', () => {
    const formSchema = new FormSchema(); // eslint-disable-line no-unused-vars
    expect(true);
  });

  test('support initializing with immutable object', () => {
    const immutableSchema = Immutable.fromJS(testSchema);
    const formSchema = new FormSchema(immutableSchema);
    expect(formSchema.getSchemaObject()).toEqual(testSchema);
  });

  test('support initializing with plain object', () => {
    const formSchema = new FormSchema(testSchema);
    expect(formSchema.getSchemaObject()).toEqual(testSchema);
  });

  test('support initializing with json string', () => {
    const jsonSchema = JSON.stringify(testSchema);
    const formSchema = new FormSchema(jsonSchema);
    expect(formSchema.getSchemaObject()).toEqual(testSchema);
  });

  test('error is thrown when initializing with invalid json', () => {
    function initializeErroneously() {
      new FormSchema('invalid');
    }

    expect(initializeErroneously).toThrow(/invalid json/);
  });
});

describe('basic usage', () => {
  describe('adding fields', () => {
    let formSchema;
    beforeEach(() => {
      formSchema = new FormSchema();
    });

    test('calling getSchemaObject on a new form returns a blank form schema', () => {
      expect(formSchema.getSchemaObject()).toEqual({
        name: '',
        fields: [],
      });
    });

    test('calling getImmutableSchema to return the schema', () => {
      expect(formSchema.getImmutableSchema().toJS()).toEqual({
        name: '',
        fields: [],
      });
    });

    test('calling serialize returns a blank schema as a json string', () => {
      expect(formSchema.serialize()).toBe("{\"name\":\"\",\"fields\":[]}");
    });

    test('calling addField adds a field with the correct type', () => {
      formSchema.addField('hidden');
      const schema = formSchema.getSchemaObject();
      expect(schema.fields[0].type).toBe('hidden');
    });

    test('calling addField with an object', () => {
      formSchema.addField({
        name: 'form name',
        type: 'text',
        label: 'Form Name',
        value: 'Some Value',
      });

      const schema = formSchema.getSchemaObject();
      expect(schema.fields[0].name).toBe('form name');
      expect(schema.fields[0].type).toBe('text');
      expect(schema.fields[0].label).toBe('Form Name');
      expect(schema.fields[0].value).toBe('Some Value');
    });

    test('calling addField with missing type in object throws an error', () => {
      function callAddFieldErroneously() {
        formSchema.addField({ name: 'hi' });
      }

      expect(callAddFieldErroneously).toThrow(/type is required/);
    });

    test('calling addField with undefined type throws an error', () => {
      function callAddFieldErroneously() {
        formSchema.addField();
      }

      expect(callAddFieldErroneously).toThrow(/type is required/);
    });
  });

  describe('removing fields', () => {
    let formSchema;
    beforeEach(() => {
      formSchema = new FormSchema();
      formSchema.addField({
        name: 'field1',
        type: 'text',
      });

      formSchema.addField({
        name: 'field2',
        type: 'text',
      });

      formSchema.addField({
        name: 'field3',
        type: 'text',
      })
    });

    test('calling removeField removes the field', () => {
      expect(formSchema.removeField(2)).toBe(true);
      const schema = formSchema.getSchemaObject();
      expect(schema.fields[2]).toBeUndefined();
    });

    test('calling removeField correctly splices and maintains field order', () => {
      expect(formSchema.removeField(1)).toBe(true);
      const schema = formSchema.getSchemaObject();
      expect(schema.fields[1]).toEqual({
        name: 'field3',
        type: 'text',
      });
    });

    test('calling removeField on something that does not exist returns false', () => {
      expect(formSchema.removeField(5)).toBe(false);
    });
  });

  describe('updating fields', () => {
    let formSchema;
    beforeEach(() => {
      formSchema = new FormSchema();
      formSchema.addField({
        name: 'field1',
        type: 'text',
      });

      formSchema.addField({
        name: 'field2',
        type: 'text',
      });

      formSchema.addField({
        name: 'field3',
        type: 'text',
      })
    });

    test('calling updateField updates the field', () => {
      formSchema.updateField(0, Immutable.Map({
        name: 'newValue',
        type: 'text',
      }));

      const schema = formSchema.getSchemaObject();
      expect(schema.fields[0]).toEqual({
        name: 'newValue',
        type: 'text',
      });
    });

    test('calling updateField with inavlid index returns false', () => {
      expect(formSchema.updateField(100, Immutable.Map({type:'text'}))).toBe(false);
    });

    test('support calling updateField with a plain javascript', () => {
      formSchema.updateField(0, {
        name: 'newValue',
        type: 'text',
      });

      const schema = formSchema.getImmutableSchema();
      expect(schema.getIn(['fields', 0]).toJS()).toEqual({
        name: 'newValue',
        type: 'text',
      });
      expect(Immutable.Iterable.isIterable(schema.getIn(['fields', 0]))).toBe(true);
    });
  });
});
