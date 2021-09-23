import { useState, useEffect } from 'react';
import ImageContentInput from '../_common/_imageContentInput.jsx';
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ThreeColumnContent(props) {

	const [state, setState] = useState({
		col1: props.value?.col1,
		col2: props.value?.col2,
		col3: props.value?.col3,

		imageUrl1: props.options?.imageUrl1,
		imageUrl2: props.options?.imageUrl2,
		imageUrl3: props.options?.imageUrl3

	});

	function onPropertyChange(name, value) {
		var newValue = { ...state, [name]: value };
		setState(newValue);
		if (props.onChange) {
			props.onChange(props.name, newValue);
		}
	}

	function cssClass() {
		return `three-column-image ${typeof (props.options.cssClass) !== "undefined" ? props.options.cssClass : ""}`;
	}

	return (
		<div className={cssClass()}>
			<div className="three-column-content">
				<ColumnImageWithText
					name="col1"
					isAdmin={props.isAdmin}
					value={state.col1}
					onChange={onPropertyChange}
					imageUrl={state.imageUrl1}
					link={props.col1Link}
					toLink={props.toLink}
				/>
				<ColumnImageWithText
					name="col2"
					isAdmin={props.isAdmin}
					value={state.col2}
					onChange={onPropertyChange}
					link={props.col2Link}
					toLink={props.toLink}
				/>
				<ColumnImageWithText
					name="col3"
					isAdmin={props.isAdmin}
					value={state.col3}
					onChange={onPropertyChange}
					link={props.col3Link}
					toLink={props.toLink}
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
		<div onClick={(e) => props.toLink(props.link, e)}>
			<div>
				<ImageContentInput
					name="imageUrl"
					isAdmin={props.isAdmin}
					value={state.imageUrl}
					onChange={onPropertyChange}
				/>
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
				<TextInput
					label="Image Link 3"
					name="imageUrl3"
					value={state.imageUrl3}
					onChange={onChange}
				/>
				<button onClick={props.onHide} className="btn btn-danger">Cancel</button>
				<input type="submit" className="btn btn-primary" value="Continue" />
			</form>
		</Overlay>
	)
}