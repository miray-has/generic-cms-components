import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ColumnImageWithText from './_columnImageWithText.jsx';
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';

export default function TwoColumnImageWithText(props) {

	const [textOption, setTextOption] = useState(props.options?.textOption || "yes");

	const [state, setState] = useState({
		col1: props.value?.col1,
		col2: props.value?.col2,

		imageUrl1: props.options?.imageUrl1,
		imageUrl2: props.options?.imageUrl2,
	});

	function onPropertyChange(name, value) {
		var newValue = { ...state, [name]: value };
		setState(newValue);
		if (props.onChange) {
			props.onChange(props.name, newValue);
		}
	}

	function cssClass() {
		return `feature-image-pair ${typeof (props.options.cssClass) !== "undefined" ? props.options.cssClass : ""} ${textOption === "Yes" || textOption === "yes" ? "text-background" : "text-background-none"}`;
	}

	return (
		<>
			<div className={cssClass()}>
				<div className="two-column-content">
					<ColumnImageWithText
						name="col1"
						value={state.col1}
						isAdmin={props.isAdmin}
						onChange={onPropertyChange}
						imageUrl={state.imageUrl1}
						link={props.col1Link}
						toLink={props.toLink}
						textOption={textOption}
					/>
					<ColumnImageWithText
						name="col2"
						isAdmin={props.isAdmin}
						value={state.col2}
						onChange={onPropertyChange}
						imageUrl={state.imageUrl2}
						link={props.col2Link}
						toLink={props.toLink}
						textOption={textOption}
					/>
				</div>
			</div>
			<Options isVisible={props.optionsMenuOpen} options={props.options} onOptionsChange={props.onOptionsChange} onOptionsHide={props.onOptionsHide} />

		</>
	);
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
					label="Text option (Yes)"
					name="textOption"
					value={state.textOption}
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