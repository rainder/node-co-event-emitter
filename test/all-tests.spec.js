'use strict';

const co = require('co');
const chai = require('chai');
const CoEventEmitter = require('./..');

chai.should();

describe('all-tests', function () {
  it('should emit an event and return a result', co.wrap(function *() {
    const events = new CoEventEmitter();

    events.on('test', function *(a) {
      return a;
    });

    const r = yield events.emit('test', 123);

    r.should.equals(123);
  }));

  it('should not allow to subscribe for the same event', co.wrap(function *() {

    const events = new CoEventEmitter();

    events.on('test', () => {});

    try {
      events.on('test', () => {
      });

      (false).should.equals(true);
    } catch (e) {

    }

  }));
});