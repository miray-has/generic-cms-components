import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';
import TextContentInput from '../_common/_textContentInput.jsx';

export default function Banner(props) {

	function onChange(name, value) {
		if (props.onChange) {
			props.onChange(props.name, value);
		}
	}

	function cssClass() {
		return `${typeof (props.options.cssClass) != "undefined" ? props.options.cssClass : ""}`;
	}

	return (
		<div className="banner">
			<div className={cssClass()}>
				<TextContentInput
					isAdmin={props.isAdmin}
					value={props.value}
					onChange={onChange}
					rows={10}
				/>
				<div>
					{props.options.link1Url && props.options.link1Text && <Link to={props.options.link1Url}>{props.options.link1Text}</Link>}
					{props.options.link2Url && props.options.link2Text && <Link to={props.options.link2Url}>{props.options.link2Text}</Link>}
				</div>
			</div>
			<Options isVisible={props.optionsMenuOpen} options={props.options} onOptionsChange={props.onOptionsChange} onOptionsHide={props.onOptionsHide} />
		</div>);
}

function Options(props) {
	const [state, setState] = useState(props.options);

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
				<h2>Banner options</h2>
				<TextInput
					label="CSS class"
					name="cssClass"
					value={state.cssClass}
					onChange={onChange}
				/>
				<TextInput
					label="Link 1 Url"
					name="link1Url"
					value={state.link1Url}
					onChange={onChange}
				/>
				<TextInput
					label="Link 1 Text"
					name="link1Text"
					value={state.link1Text}
					onChange={onChange}
				/>
				<TextInput
					label="Link 2 Url"
					name="link2Url"
					value={state.link2Url}
					onChange={onChange}
				/>
				<TextInput
					label="Link 2 Text"
					name="link2Text"
					value={state.link2Text}
					onChange={onChange}
				/>
				<button onClick={props.onHide} className="btn btn-danger">Cancel</button>
				<input type="submit" className="btn btn-primary" value="Continue" />
			</form>
		</Overlay>
	)
}