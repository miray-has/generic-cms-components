import React from "react";
import { BrowserRouter, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';

export default function Button(props) {

	const [state, setState] = useState({
		buttonText: props.value?.buttonText,
	});

	function onPropertyChange(name, value) {
		var newValue = { ...state, [name]: value };
		setState(newValue);
		if (props.onChange) {
			props.onChange(props.name, newValue);
		}
	}

	function onChange({ target }) {
		onPropertyChange(target.name, target.value);
	}
	return (
		<div id="hmpage-button">
			<div id="homepage-button">
				<div>
					<div>
						{props.isAdmin &&
							<>
								<button>
									<input type="text" name="buttonText" value={state.buttonText} onChange={onChange} />
								</button>
							</>
						}
						{!props.isAdmin &&
							<>
							<button>
								<BrowserRouter>
									<Link to={`${state.buttonText}`}>{state.buttonText}</Link>
								</BrowserRouter>
							</button>
							</>
						}
					</div>
				</div>
			</div>
			<Options isVisible={props.optionsMenuOpen} options={props.options} onOptionsChange={props.onOptionsChange} onOptionsHide={props.onOptionsHide} />
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
				<h2>Options</h2>
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
