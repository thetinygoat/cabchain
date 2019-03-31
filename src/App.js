import React, { Component } from 'react';
import Map from './map/Map';
import web3 from './web3';
import Login from './auth/login';
import Signup from './auth/signup';
import { Router, Redirect } from '@reach/router';
import Order from './order/order';
import Error from './error';
import Autocomplete from './autocomplete/autocomplete';

class App extends Component {
	state = {
		metamaskPresent: true
	};
	async componentDidMount() {
		if (!window.ethereum) {
			this.setState({ metamaskPresent: false });
			alert(
				'metamask extension not found!! please install and create an account'
			);
			return;
		}
		await window.ethereum.enable();
	}
	render() {
		return (
			<div>
				<Router>
					{this.state.metamaskPresent ? (
						<Autocomplete path="/" />
					) : (
						<Redirect to="/error" from="/" />
					)}
					<Error path="/error" />
					<Login path="/login" />
					<Signup path="/signup" />
					<Order path="/order" />
				</Router>
			</div>
		);
	}
}

export default App;
