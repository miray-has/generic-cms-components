import React from "react";
import PropType from "prop-types";
import { useState, useEffect, useRef } from "react";

function TextInput(props) {
	const inputElement = useRef(null);
	const [inputProperties, setInputProperties] = useState({ className: "form-control" });

	useEffect(() => {
		setClassName(false);

	}, [props.value, props.error]);

	function setClassName(focused) {
		var className = "form-control";
		if ((typeof (props.value) !== "undefined" && props.value !== null && props.value !== "") || focused) {
			className += " has-value";
		}
		if (props.error) {
			className += " is-invalid";
		}
		setInputProperties({
			...inputProperties, className: className
		});
	}

	function labelClick() {
		inputElement.current.focus();
		setClassName(true);
	}

	return (
		<div className="form-group">
			{!props.multiline &&
				<input
					ref={inputElement}
					type="text"
					className={inputProperties.className}
					onChange={props.onChange}
					name={props.name}
					value={(props.value === undefined) ? "" : props.value}
					onBlur={props.onBlur}
				/>
			}
			<label onClick={labelClick} htmlFor={props.name}>{props.label || props.name}{props.error && <span className="badge badge-danger">{props.error}</span>}</label>
			{props.multiline &&
				<textarea
					ref={inputElement}
					className={inputProperties.className}
					onChange={props.onChange}
					name={props.name}
					value={(props.value === undefined) ? "" : props.value}
					onBlur={props.onBlur}
				></textarea>
			}
		</div>
	);
}

TextInput.propTypes = {
	name: PropType.string.isRequired,
	onChange: PropType.func.isRequired,
	value: PropType.oneOfType([
		PropType.string,
		PropType.number
	]),
	error: PropType.string,
	onBlur: PropType.func
};

TextInput.defaultProps = {
	error: ""
}

export default TextInput;