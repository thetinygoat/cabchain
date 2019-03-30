import React, { Component } from 'react';
import Button from '../common/button';
import Container from '../common/container';
import {
	withGoogleMap,
	GoogleMap,
	withScriptjs,
	InfoWindow,
	Marker
} from 'react-google-maps';
import { Link } from '@reach/router';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
Geocode.setApiKey('AIzaSyB17ywpFehxtqQLZo3wsEK0n1xnNBtIOCA');
Geocode.enableDebug();

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dest: '',
			origin: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		};
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		Geocode.fromLatLng(
			this.state.mapPosition.lat,
			this.state.mapPosition.lng
		).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray);

				this.setState({
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : ''
				});
			},
			error => {
				console.error(error);
			}
		);
	}
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state
		) {
			return true;
		} else if (this.props.center.lat === nextProps.center.lat) {
			return false;
		}
	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = addressArray => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (
				addressArray[i].types[0] &&
				'administrative_area_level_2' === addressArray[i].types[0]
			) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = addressArray => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if (
						'sublocality_level_1' === addressArray[i].types[j] ||
						'locality' === addressArray[i].types[j]
					) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = addressArray => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (
					addressArray[i].types[0] &&
					'administrative_area_level_1' === addressArray[i].types[0]
				) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = event => {};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = event => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray);
				this.setState({
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : ''
				});
			},
			error => {
				console.error(error);
			}
		);
	};

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onOriginSelected = place => {
		console.log('plc', place.place_id);
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			origin: place.place_id,
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			}
		});
	};
	onDestSelected = place => {
		console.log('plc', place.place_id);
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			dest: place.place_id,
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			}
		});
	};

	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap(props => (
				<GoogleMap
					google={this.props.google}
					defaultZoom={this.props.zoom}
					defaultCenter={{
						lat: this.state.mapPosition.lat,
						lng: this.state.mapPosition.lng
					}}
				>
					{/* InfoWindow on top of marker */}
					<InfoWindow
						onClose={this.onInfoWindowClose}
						position={{
							lat: this.state.markerPosition.lat + 0.0018,
							lng: this.state.markerPosition.lng
						}}
					>
						<div>
							<span style={{ padding: 0, margin: 0 }}>
								{this.state.address}
							</span>
						</div>
					</InfoWindow>
					{/*Marker*/}
					<Marker
						google={this.props.google}
						name={'Dolores park'}
						draggable={true}
						onDragEnd={this.onMarkerDragEnd}
						position={{
							lat: this.state.markerPosition.lat,
							lng: this.state.markerPosition.lng
						}}
					/>
					<Marker />
					{/* For Auto complete Search Box */}
					<Container
						style={{
							padding: '1em'
						}}
					>
						<div style={{ display: 'block' }}>
							<h3>Current Location</h3>
							<Autocomplete
								style={{
									width: '100%',
									height: '40px',
									paddingLeft: '16px',
									marginTop: '2px',
									marginBottom: '1em',
									borderRadius: '2px',
									border: '1px solid #e0e0e0'
								}}
								onPlaceSelected={this.onOriginSelected}
								types={['(regions)']}
							/>
						</div>
						<div>
							<h3>Destination</h3>
							<Autocomplete
								style={{
									width: '100%',
									height: '40px',
									paddingLeft: '16px',
									marginTop: '2px',
									marginBottom: '1em',
									borderRadius: '2px',
									border: '1px solid #e0e0e0'
								}}
								onPlaceSelected={this.onDestSelected}
								types={['(regions)']}
							/>
						</div>
						{this.state.dest && this.state.origin && (
							<Button>
								<Link
									to={`/order?origin=${this.state.origin}&dest=${
										this.state.dest
									}`}
								>
									Continue
								</Link>
							</Button>
						)}
					</Container>
				</GoogleMap>
			))
		);
		let map;
		if (this.props.center.lat !== undefined) {
			map = (
				<div>
					<AsyncMap
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB17ywpFehxtqQLZo3wsEK0n1xnNBtIOCA&libraries=places"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: this.props.height }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
			);
		} else {
			map = <div style={{ height: this.props.height }} />;
		}
		return <div style={{ width: '70%', margin: 'auto' }}>{map}</div>;
	}
}
export default Map;
