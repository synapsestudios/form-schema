const Field = require('../lib/field');

describe('initialization', () => {
  test('initializing with missing type in object throws an error', () => {
    function instantiateFieldErroneously() {
      new Field({ name: 'hi' })
    }

    expect(instantiateFieldErroneously).toThrow(/type is required/);
  });

  test('initializing with undefined type throws an error', () => {
    function instantiateFieldErroneously() {
      new Field();
    }

    expect(instantiateFieldErroneously).toThrow(/type is required/);
  });

  test('calling Field::set() adds a value to the field definition', () => {
    const field = new Field('text');

    field.set('value', 'hello');
    expect(field.value).toBe('hello');
  });
});
