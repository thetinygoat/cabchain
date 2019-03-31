import React, { Component } from 'react';
import Map from './map/Map';
import web3 from './web3';
import Login from './auth/login';
import Signup from './auth/signup';
import { Router } from '@reach/router';
import Order from './order/order';
import Autocomplete from './autocomplete/autocomplete';

class App extends Component {
	async componentDidMount() {
		await window.ethereum.enable();
	}
	render() {
		return (
			<div>
				<Router>
					{/* <Map
						center={{ lat: 18.5204, lng: 73.8567 }}
						height="300px"
						zoom={15}
						path="/"
					/> */}
					<Autocomplete path="/" />
					<Login path="/login" />
					<Signup path="/signup" />
					<Order path="/order" />
				</Router>
			</div>
		);
	}
}

export default App;
