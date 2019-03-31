import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import Container from '../common/container';
import styled from 'styled-components';
import mapimg from '../map2.svg';
import { Link } from '@reach/router';
import Button from '../common/button';
const SearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
const Logo = styled.img`
	width: 50%;
`;
const Heading = styled.h1`
	font-size: 4em;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const autocomplete = () => {
	const [origin, setOrigin] = useState('');
	const [dest, setdest] = useState('');
	const handleDest = place => {
		console.log(place.place_id);
		setdest(place.place_id);
	};
	const handleOrigin = place => {
		console.log(place.place_id);
		setOrigin(place.place_id);
	};
	return (
		<div>
			<Heading>
				<i className="material-icons" style={{ fontSize: '1em' }}>
					directions_car
				</i>
				Cab Chain
			</Heading>
			<Container
				form
				style={{
					boxShadow: '0 0 20px 10px #212121',
					padding: '1em',
					marginBottom: '1em',
					backgroundColor: '#424242',
					borderRadius: '5px'
				}}
			>
				<Logo src={mapimg} />
				<SearchContainer>
					<h2>Your Location</h2>
					<Autocomplete
						style={{
							width: '90%',
							border: '1px solid #e0e0e0',
							padding: '1em',
							borderRadius: '4px'
						}}
						onPlaceSelected={place => handleOrigin(place)}
						types={['(regions)']}
					/>
				</SearchContainer>
				<SearchContainer>
					<h2>Destination</h2>
					<Autocomplete
						style={{
							width: '90%',
							border: '1px solid #e0e0e0',
							padding: '1em',
							borderRadius: '4px'
						}}
						onPlaceSelected={place => handleDest(place)}
						types={['(regions)']}
					/>
				</SearchContainer>
				{dest && origin && (
					<Button>
						<Link to={`/order?origin=${origin}&dest=${dest}`}>Continue</Link>
					</Button>
				)}
			</Container>
		</div>
	);
};

export default autocomplete;
