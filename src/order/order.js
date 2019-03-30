import React, { Component } from 'react';
import axios from 'axios';
import cabchain from '../cabchain';
import web3 from '../web3';
import Notification from '../common/notification';
import styled from 'styled-components';
import Spinner from '../common/spinner/spinner';
const Databoard = styled.div`
	box-shadow: 0 0 10px 1px #e0e0e0;
	display: flex;
	width: 50%;
	padding: 1em;
	margin: 1em;
	border-radius: 2px;
	justify-content: space-around;
`;
const Rideboard = styled.div`
	width: 60%;
	display: flex;
	margin: 1em auto;
	flex-direction: column;
`;
const RideInfo = styled.div`
	box-shadow: 0 0 7px 1px #e0e0e0;
	display: flex;
	width: 50%;
	padding: 1em;
	margin: 1em auto;
	border-radius: 2px;
	justify-content: space-around;
	align-items: center;
`;
const RideButton = styled.button`
	color: #000;
	font-weight: bold;
	width: 40%;
	border: 1px solid yellow;
	background-color: yellow;
	border-radius: 2px;
	padding: 1em;
	cursor: pointer;
	display: flex;
	align-items: center;
`;
export class order extends Component {
	state = {
		dest: '',
		origin: '',
		time: '',
		distance: '',
		error: null,
		loading: true
	};
	async componentDidMount() {
		const qparams = this.props.location.search.split('&');
		const origin = qparams[0].split('=');
		const dest = qparams[1].split('=');
		let data;
		try {
			data = await axios.post('http://localhost:8080/api/get/journey', {
				origin: origin[1],
				destination: dest[1]
			});
			if (data.data) {
				this.setState({ loading: false });
			}
			if (data.data.error === 'NO_ROUTE') {
				this.setState({ error: data.data.error });
				return;
			} else if (data.data.error === 'ALL_OK') {
				this.setState({
					distance: data.data.distance,
					time: data.data.duration
				});
			}
			console.log(data.data);
		} catch (err) {
			console.log(err);
		}
	}
	handleClick = async coins => {
		console.log(coins);

		const amount = web3.utils.toBN(
			Math.floor(coins * parseFloat(this.state.distance))
		);
		const decimals = web3.utils.toBN(8);
		let value =
			'0x' + amount.mul(web3.utils.toBN(10).pow(decimals)).toString('hex');
		await cabchain.methods
			.transfer('0x1Fa94B56255F980Ff40D116c45B1E7B443c7f042', value)
			.send({ from: '0x3e5fba3319Fb8e764d10C22b05ea064A395DE2a4' })
			.on('transactionHash', hash => {
				console.log(hash);
			});
	};
	render() {
		return (
			<div
				style={{
					width: '80%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				{!this.state.loading ? (
					<React.Fragment>
						{this.state.error === 'NO_ROUTE' && (
							<Notification style={{ color: '#fff' }}>
								No route found!!
							</Notification>
						)}
						{this.state.distance && (
							<React.Fragment>
								<Databoard>
									<h2
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between'
										}}
									>
										<i class="material-icons">directions_car</i>
										{this.state.distance}
									</h2>
									<h2
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between'
										}}
									>
										<i class="material-icons">access_time</i>
										{this.state.time}
									</h2>
								</Databoard>
								<Rideboard>
									<RideInfo>
										<div>
											<h3>John Wick</h3>
											<p>DL8GH780</p>
										</div>
										<RideButton onClick={() => this.handleClick(15.5)}>
											<i class="material-icons">attach_money</i> 15.5/ Km
										</RideButton>
									</RideInfo>
									<RideInfo>
										<div>
											<h3>Chris Evans</h3>
											<p>DL8UJ8508</p>
										</div>
										<RideButton onClick={() => this.handleClick(18.6)}>
											<i class="material-icons">attach_money</i> 18.6 / Km
										</RideButton>
									</RideInfo>
									<RideInfo>
										<div>
											<h3>John Doe</h3>
											<p>DL8CJ9898</p>
										</div>
										<RideButton onClick={() => this.handleClick(21.3)}>
											<i class="material-icons">attach_money</i> 21.3 / Km
										</RideButton>
									</RideInfo>
								</Rideboard>
							</React.Fragment>
						)}
					</React.Fragment>
				) : (
					<Spinner />
				)}
			</div>
		);
	}
}

export default order;
