import React from 'react';
import Container from '../common/container';
import Button from '../common/button';
import Input from '../common/input';
import { Link } from '@reach/router';
const login = () => {
	return (
		<Container form>
			<h1>Login</h1>
			<Input placeholder="Email" />
			<Input placeholder="Password" />
			<Button>Login</Button>
			<p>
				don't have an account ? <Link to="/signup">sign up</Link>
			</p>
		</Container>
	);
};

export default login;
