const Redux = require('redux');

Redux.createStore((previousState, action) => {
	console.log(action);
});
