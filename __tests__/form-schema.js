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
    formSchema.addField('name', 'text');

    const schema = formSchema.getFormSchema();
    expect(schema.fields[0].name).toBe('name');
    expect(schema.fields[0].element).toBe('text');
  });
});
