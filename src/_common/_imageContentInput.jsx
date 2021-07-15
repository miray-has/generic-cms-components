import React, { Component } from "react";
import { useState, useEffect, useRef } from "react";
import TextInput from "./TextInput.js";
import Overlay from "./_overlay.jsx";
import PropTypes from 'prop-types';

export default function ImageContentInput(props) {
	const [state, setState] = useState(props.value || { url: "/img/placeholders/non-destructive-testing-simulator-blog-post-tease@2x.jpg" })
	const [settingsVisible, setSettingsVisible] = useState(false);

	function onChange({ target }) {
		setState({ ...state, [target.name]: target.value });
	}

	function showSettings() {
		setSettingsVisible(true);
	}

	function hideSettings() {
		setSettingsVisible(false);
	}

	const handleSubmit = function (event) {
		console.debug("handleSubmit", state);
		props.onChange(props.name, state);
		hideSettings();
		event.preventDefault();
	}

	return (
		<div className="content-image" >
			{ props.isAdmin &&
				<>
					<button className="float-right" onClick={showSettings}>Edit image</button>
					<Overlay visible={settingsVisible}>
						<form onSubmit={handleSubmit} method="post">
							<h2>Image</h2>
							<TextInput
								label="Url"
								name="url"
								value={state.url}
								onChange={onChange}
							/>
							<TextInput
								label="Alternative text"
								name="alt"
								value={state.alt}
								onChange={onChange}
							/>
							<button onClick={hideSettings} className="btn btn-danger">Cancel</button>
							<input type="submit" className="btn btn-primary" value="Continue" />
						</form>
					</Overlay>
				</>
			}
			<img src={state.url} alt={state.alt} />
		</div>
	);
}

ImageContentInput.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func,
	isAdmin: PropTypes.bool,
	name: PropTypes.string
};