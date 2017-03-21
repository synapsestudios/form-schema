const FormSchema = require('../lib/form-schema');

test('form initializes without error', () => {
  const formSchema = new FormSchema(); // eslint-disable-line no-unused-vars
  expect(true);
});

test('calling getFormSchema on a new form returns a blank form schema', () => {
  const formSchema = new FormSchema();

  expect(formSchema.getFormSchema()).toEqual({
    name: '',
    fields: [],
  });
});
