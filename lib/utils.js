'use strict';

module.exports = {
  hasOwnProperty,
};

/**
 *
 * @param object
 * @param property
 * @returns {*}
 */
function hasOwnProperty(object, property) {
  /* eslint prefer-reflect: 0 */
  return Object.prototype.hasOwnProperty.call(object, property);
}
