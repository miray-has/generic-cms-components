import { useState, useEffect } from 'react';
import TextContentInput from '../_common/_textContentInput.jsx';
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';

export default function TwoColumnContent(props) {
	const [state, setState] = useState({
		col1: props.value.col1,
		col2: props.value.col2
	});

	function onChange(name, value) {
		var newValue = { ...state, [name]: value };
		setState(newValue);
		if (props.onChange) {
			props.onChange(props.name, newValue);
		}
	}

	return (
		<div>
			<div className={`two-column-content ${props.options.cssClass} `}>
				<div>
					<TextContentInput
						name="col1"
						isAdmin={props.isAdmin}
						value={props.value.col1}
						onChange={onChange}
						rows={10}
						/>
				</div>
				<div>
					<TextContentInput
						name="col2"
						isAdmin={props.isAdmin}
						value={props.value.col2}
						onChange={onChange}
						rows={10}
						/>
				</div>
			</div>
			<Options isVisible={props.optionsMenuOpen} options={props.options} onOptionsChange={props.onOptionsChange} onOptionsHide={ props.onOptionsHide} />
		</div>
	);
}

function Options(props) {
	const [state, setState] = useState(props.options || { layout: null });

	useEffect(() => {
		console.debug("Options", props.isVisible);
	}, [props.isVisible])

//	let error = { layout: "" };

	//const options = [
	//	{ value: "wide-left", label: "Wider left column" },
	//	{ value: "equal", label: "Two even columns" },
	//	{ value: "wide-right", label: "Wider right column" }
	//]

	function onChange({ target }) {
		var newState = { ...state, [target.name]: target.value };
		setState(newState);
	}

	const handleSubmit = function (event) {
		console.debug("handleSubmit", state);
		props.onOptionsChange(state);
		event.preventDefault();
	}

	return (
		<Overlay visible={props.isVisible} onHide={props.onHide}>
		<form onSubmit={handleSubmit} method="post">
			<h2>Banner options</h2>
			<TextInput
				label="CSS class"
				name="cssClass"
				value={state.cssClass}
				onChange={onChange}
				/>
			<button onClick={props.onHide} className="btn btn-danger">Cancel</button>
			<input type="submit" className="btn btn-primary" value="Continue" />
		</form>
		</Overlay>
	)
}