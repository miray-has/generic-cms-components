﻿import { useState, useEffect } from 'react';
import { Link, StaticRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types';

import ImageContentInput from '../_common/_imageContentInput.jsx';
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';

export default function TwoColumnImageWithText(props) {

	const [state, setState] = useState({
		col1: props.value?.col1,
		col2: props.value?.col2,

		imageUrl1: props.options?.imageUrl1,
		imageUrl2: props.options?.imageUrl2
	});

	function onPropertyChange(name, value) {
		var newValue = { ...state, [name]: value };
		setState(newValue);
		if (props.onChange) {
			props.onChange(props.name, newValue);
		}
	}

	function cssClass() {
		return `feature-image-pair ${typeof (props.options.cssClass) !== "undefined" ? props.options.cssClass : ""}`;
	}

	return (
		<div className={cssClass()}>
			<div className="two-column-content">
				<ColumnImageWithText
					name="col1"
					isAdmin={props.isAdmin}
					value={state.col1}
					onChange={onPropertyChange}
					imageUrl={state.imageUrl1}
				/>
				<ColumnImageWithText
					name="col2"
					isAdmin={props.isAdmin}
					value={state.col2}
					onChange={onPropertyChange}
					imageUrl={state.imageUrl2}

				/>
			</div>
			<Options isVisible={props.optionsMenuOpen} options={props.options} onOptionsChange={props.onOptionsChange} onOptionsHide={props.onOptionsHide} />
		</div>
	);
}

function ColumnImageWithText(props) {

	const [state, setState] = useState({
		header: props.value?.header,
		subtext: props.value?.subtext,
		imageUrl: props.value?.imageUrl
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
		<div>
			<div>
				<ImageContentInput
					name="imageUrl"
					isAdmin={props.isAdmin}
					value={state.imageUrl}
					onChange={onPropertyChange}
				/>
				<div>
					{props.isAdmin &&
						<>
							<div>
								<h3>
									<input type="text" name="header" value={state.header} onChange={onChange} />
								</h3>
							</div>
							<div>
								<p>
									<input type="text" name="subtext" value={state.subtext} onChange={onChange} />
								</p>
							</div>
						</>
					}
					{!props.isAdmin &&
						<>
							<Router>
								<div><h3><Link to={`${state.imageUrl}`}>{state.header}</Link></h3></div>
							</Router>
							<div><p>{state.subtext}</p></div>
						</>
					}
				</div>

			</div>
		</div>
	)
}

function Options(props) {
	const [state, setState] = useState(props.options || { layout: null });

	useEffect(() => {
		console.log("Options", props.isVisible);
	}, [props.isVisible])

	function onChange({ target }) {
		var newState = { ...state, [target.name]: target.value };
		setState(newState);
	}

	const handleSubmit = function (event) {
		console.log("handleSubmit", state);
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
				<TextInput
					label="Image Link 1"
					name="imageUrl1"
					value={state.imageUrl1}
					onChange={onChange}
				/>
				<TextInput
					label="Image Link 2"
					name="imageUrl2"
					value={state.imageUrl2}
					onChange={onChange}
				/>
				<button onClick={props.onHide} className="btn btn-danger">Cancel</button>
				<input type="submit" className="btn btn-primary" value="Continue" />
			</form>
		</Overlay>
	)
}

TwoColumnImageWithText.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func,
	isAdmin: PropTypes.bool,
	name: PropTypes.string,
	imageUrl: PropTypes.string
};