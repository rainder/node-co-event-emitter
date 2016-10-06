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
   * @param eventName
   * @param fn
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
   * @param eventName
   * @param args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    if (!hasOwnProperty(this[EVENTS$], eventName)) {
      return false;
    }

    return co(this[EVENTS$][eventName](...args));
  }
};
