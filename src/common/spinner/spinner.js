import React from 'react';
import './spinner.css';
const spinner = () => {
	return (
		<div className="lds-ring">
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};

export default spinner;
