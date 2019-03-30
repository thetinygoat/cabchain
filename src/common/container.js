import React from 'react';
import styled from 'styled-components';
const Container = styled.section`
	width: ${props => (props.form ? '30%' : '70%')};
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default Container;
