const immutable = require('immutable');

const validateInitialization = function(type) {
  let localType = type;
  if (type && typeof type === 'object') {
    localType = type.type;
  }

  if (!localType) {
    throw new Error('Field type is required');
  }
}

module.exports = function(type) {
  validateInitialization(type);

  let field = {};
  if (type && typeof type === 'object') {
    Object.assign(field, type);
  } else {
    field.type = type;
  }

  return immutable.fromJS(field);
}
