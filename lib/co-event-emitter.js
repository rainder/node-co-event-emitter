'use strict';

const co = require('co');
const { hasOwnProperty } = require('./utils');
const EVENTS$ = Symbol();

module.exports = class CoEventEmitter {
  /**
   *
   */
  constructor() {
    this[EVENTS$] = {};
  }

  /**
   *
   * @param eventName {String}
   * @param fn {Function|GeneratorFunction)
   */
  on(eventName, fn) {
    if (hasOwnProperty(this[EVENTS$], eventName)) {
      throw new Error(`Already subscribed for an ${eventName} event`);
    }

    this[EVENTS$][eventName] = fn;

    return this;
  }

  /**
   *
   * @param eventName {String}
   * @returns {CoEventEmitter}
   */
  off(eventName) {
    if (!hasOwnProperty(this[EVENTS$], eventName)) {
      throw new Error(`No event listeners found for an event ${eventName}`);
    }

    delete this[EVENTS$][eventName];

    return this;
  }

  /**
   *
   * @param eventName {String}
   * @returns {boolean}
   */
  has(eventName) {
    return hasOwnProperty(this[EVENTS$], eventName);
  }

  /**
   *
   * @param eventName {String}
   * @param (args)
   * @returns {Boolean}
   */
  emit(eventName, ...args) {
    if (!hasOwnProperty(this[EVENTS$], eventName)) {
      return false
    }

    co(this[EVENTS$][eventName](...args));

    return true;
  }

  /**
   *
   * @param eventName {String}
   * @param (args)
   * @returns {Promise}
   */
  call(eventName, ...args) {
    if (!hasOwnProperty(this[EVENTS$], eventName)) {
      throw new Error(`No event listeners found for an event ${eventName}`);
    }

    return co(this[EVENTS$][eventName](...args));
  }
};
