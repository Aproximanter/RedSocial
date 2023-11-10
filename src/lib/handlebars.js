const helpers = {};

helpers.ifEquals = (arg1, arg2, options) => {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
}

helpers.ifEqualsOrBigger = (arg1, arg2, options) => {
  return (arg1 >= arg2) ? options.fn(this) : options.inverse(this);
}

helpers.ifBigger = (arg1, arg2, options) => {
  return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
}

module.exports = helpers;