const Immutable = require('immutable');

const validateInitialization = function(type) {
  let localType = type;

  if (type) {
    if (Immutable.Iterable.isIterable(type)) {
      localType = type.get('type');
    } else if (typeof type === 'object') {
      localType = type.type;
    }
  }

  if (!localType) {
    throw new Error('Field type is required');
  }
}

module.exports = function(type) {
  validateInitialization(type);

  let field = Immutable.Map();
  if (Immutable.Iterable.isIterable(type)) {
    field = type;
  } else if (typeof type === 'object') {
    field = Immutable.fromJS(type);
  } else {
    field = field.set('type', type);
  }

  return field;
}
