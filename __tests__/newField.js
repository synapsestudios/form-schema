const newField = require('../lib/newField');
const Immutable = require('immutable');

test('calling with missing type in object throws an error', () => {
  function instantiateFieldErroneously() {
    newField({ name: 'hi' })
  }

  expect(instantiateFieldErroneously).toThrow(/type is required/);
});

test('calling with missing type in immutable object rhows an error', () => {
  function instantiateFieldErroneously() {
    newField(Immutable.Map({ name: 'hi' }));
  }

  expect(instantiateFieldErroneously).toThrow(/type is required/);
});

test('calling with undefined type throws an error', () => {
  function instantiateFieldErroneously() {
    newField();
  }

  expect(instantiateFieldErroneously).toThrow(/type is required/);
});

test('supports calling newField with type string', () => {
  const field = newField('text');
  expect(field.toJS()).toEqual({type: 'text'});
});

test('support calling newField with object', () => {
  const field = newField({
    name: 'form name',
    type: 'text',
    label: 'Form Name',
    value: 'Some Value',
  });

  expect(field.toJS()).toEqual({
    name: 'form name',
    type: 'text',
    label: 'Form Name',
    value: 'Some Value',
  });
});

test('support calling newField with immutable object', () => {
  const field = newField(Immutable.Map({type: 'text'}));
  expect(field.toJS()).toEqual({type: 'text'});
});
