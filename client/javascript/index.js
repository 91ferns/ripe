const Redux = require('redux');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');

// Components
const Provider = ReactRedux.Provider;

const store = Redux.createStore((state, action) => {
	if (typeof previousState === 'undefined') {
		state = {};
	}
	state.test = { text: action.text };

	return state;
});

let counter = 0;

class TestComponent extends React.Component {
	render() {
		return (
			<button className='btn btn-default' onClick={() => this.props.onClick(counter++)}>
				Hey Button {this.props.text}
			</button>
		);
	}
}

const TestBindComponent = ReactRedux.connect((state) => {
	console.log(state);
	return state.test;
}, (dispatch) => {
	return {
		onClick: (id) => {
			dispatch({ type: 'awesome', text: id })
		}
	}
})(TestComponent);

ReactDOM.render(
	<Provider store={store}>
		<TestBindComponent />
	</Provider>,
	document.getElementById('root')
);
