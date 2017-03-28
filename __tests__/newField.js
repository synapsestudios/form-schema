const newField = require('../lib/newField');

test('calling with missing type in object throws an error', () => {
  function instantiateFieldErroneously() {
    newField({ name: 'hi' })
  }

  expect(instantiateFieldErroneously).toThrow(/type is required/);
});

test('calling with undefined type throws an error', () => {
  function instantiateFieldErroneously() {
    newField();
  }

  expect(instantiateFieldErroneously).toThrow(/type is required/);
});
