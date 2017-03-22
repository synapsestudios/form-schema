const FormSchema = require('../lib/form-schema');


describe('initialization', () => {
  test('form initializes without error', () => {
    const formSchema = new FormSchema(); // eslint-disable-line no-unused-vars
    expect(true);
  });
});

describe('basic usage', () => {
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
