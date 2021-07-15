import { useState, useEffect } from 'react';
import ImageContentInput from '../_common/_imageContentInput.jsx';
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';

export default function OneColumnWideImage(props) {
	const [state, setState] = useState(props.value);

	function onChange(name, value) {
		var newValue = { ...state, [name]: value };
		setState(newValue);
		if (props.onChange) {
			props.onChange(props.name, newValue);
		}
	}

	return (
		<div>
			<div className={`wide-image ${props.options.cssClass} `}>
				<div>
					<ImageContentInput
						name="image"
						isAdmin={props.isAdmin}
						value={props.value.image}
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
			<h2>Wide image options</h2>
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