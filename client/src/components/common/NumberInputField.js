import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const NumberInputField = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

NumberInputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.number.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
};

NumberInputField.defaultProps = {
	type: 'number'
};

export default NumberInputField;
