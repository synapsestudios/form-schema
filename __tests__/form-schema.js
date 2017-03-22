const FormSchema = require('../lib/form-schema');


describe('initialization', () => {
  test('form initializes without error', () => {
    const formSchema = new FormSchema(); // eslint-disable-line no-unused-vars
    expect(true);
  });
});

describe('basic usage', () => {
  describe('adding fields', () => {
    let formSchema;
    beforeEach(() => {
      formSchema = new FormSchema();
    });

    test('calling getFormSchema on a new form returns a blank form schema', () => {

      expect(formSchema.getFormSchema()).toEqual({
        name: '',
        fields: [],
      });
    });

    test('calling serialize returns a blank schema as a json string', () => {
      expect(formSchema.serialize()).toBe("{\"name\":\"\",\"fields\":[]}");
    });

    test('calling addField adds a field with the correct name and type', () => {
      formSchema.addField('name', 'hidden');

      const schema = formSchema.getFormSchema();
      expect(schema.fields[0].name).toBe('name');
      expect(schema.fields[0].type).toBe('hidden');
    });

    test('calling AddField with an object', () => {
      formSchema.addField({
        name: 'form name',
        type: 'text',
        label: 'Form Name',
        value: 'Some Value',
      });

      const schema = formSchema.getFormSchema();
      expect(schema.fields[0].name).toBe('form name');
      expect(schema.fields[0].type).toBe('text');
      expect(schema.fields[0].label).toBe('Form Name');
      expect(schema.fields[0].value).toBe('Some Value');
    });

    test('calling addField with missing name in object throws an error', () => {
      function callAddFieldErroneously() {
        formSchema.addField({ type: 'hi' });
      }

      expect(callAddFieldErroneously).toThrow(/name is required/);
    });

    test('calling addField with null name throws an error', () => {
      function callAddFieldErroneously() {
        formSchema.addField(null);
      }

      expect(callAddFieldErroneously).toThrow(/name is required/);
    });

    test('calling addField with missing type in object throws an error', () => {
      function callAddFieldErroneously() {
        formSchema.addField({ name: 'hi' });
      }

      expect(callAddFieldErroneously).toThrow(/type is required/);
    });

    test('calling addField with undefined type throws an error', () => {
      function callAddFieldErroneously() {
        formSchema.addField('hi');
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
      expect(formSchema.removeField('field3')).toBe(true);
      const schema = formSchema.getFormSchema();
      expect(schema.fields[2]).toBeUndefined();
    });

    test('calling removeField correctly splices and maintains field order', () => {
      expect(formSchema.removeField('field2')).toBe(true);
      const schema = formSchema.getFormSchema();
      expect(schema.fields[1]).toEqual({
        name: 'field3',
        type: 'text',
      });
    });

    test('calling removeField on something that does not exist returns false', () => {
      expect(formSchema.removeField('hello')).toBe(false);
    });
  });


});
