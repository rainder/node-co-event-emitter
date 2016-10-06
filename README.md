# CoEventEmitter



## API

### .on(eventName: String, function: Promise|GeneratorFunction|Thunk): CoEventEmitter

Subscribes for an event. CoEventEmitter allows to subscribe for an event only once. Throws an Error if there is already a listener for an event.

Examples:

```js
//GeneratorFunction implementation
events.on('event-name', function *() {
  return 'result';
});

//Async/Await implementation
events.on('event-name', async function () {
  return 'result';
});

//Thunk implementation
events.on('event-name', (cb) => {
  cb(null, 'result');
});

//Promise implementation
events.on('event-name', new Promise((resolve, reject) => {
  resolve('result');
}));

//Promise v2 implementation
events.on('event-name', () => {
  return Promise.resolve('result');
});

events.call('event-name', 'hello world')
  .then((result) => console.log(result)); //'hello world'
```

### .off(eventName: String): CoEventEmitter

Removes a subscription for an event.  Throws an error if no event listener found.

```js
events.off('event-name');
```

### .has(eventName: String): Boolean

Return true if there is a registered listener for a provided event.

```js
events.has('event-name');
```

### .call(eventName: String, ...args): Promise

Emits an event and returns a promise. Throws an error if no event listener found.

```js
events.call('event-name')
    .then((result) => { /* handle result */ })
    .catch((err) => { /* handle err */ });
}
```

### .emit(eventName: String): Boolean

Emits an event. Returns a boolean value indicating if listener have been found.

```js
events.emit('event-name');
```