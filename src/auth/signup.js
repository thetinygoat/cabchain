import React from 'react';
import Container from '../common/container';
import Button from '../common/button';
import Input from '../common/input';
import { Link } from '@reach/router';
const signup = () => {
	return (
		<Container form>
			<h1>Sign Up</h1>
			<Input placeholder="Email" />
			<Input placeholder="Password" />
			<Button>Sign Up</Button>
			<p>
				already have an account ? <Link to="/login">login</Link>
			</p>
		</Container>
	);
};

export default signup;
