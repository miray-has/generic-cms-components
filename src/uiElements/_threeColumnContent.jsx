import { useState, useEffect } from 'react';
import TextContentInput from '../_common/_textContentInput.jsx';
import Overlay from '../_common/_overlay.jsx';
import TextInput from '../_common/TextInput.js';

export default function ThreeColumnContent(props) {

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
					<h2>Content list options</h2>
					<TextInput
						label="Number of items"
						name="numberOfItems"
						value={state.numberOfItems}
						onChange={onChange}
					/>
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

	const [state, setState] = useState({
		col1: props.value.col1,
		col2: props.value.col2,
		col3: props.value.col3
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
		<div className="three-column-content">
			<div>				 
				<TextContentInput
					isAdmin={props.isAdmin}
					name="col1"
					value={props.value.col1}
					onChange={onChange}
					rows={10}
					/>
			</div>
			<div>
				<TextContentInput
					isAdmin={props.isAdmin}
					name="col2"
					value={props.value.col2}
					onChange={onChange}
					rows={10}
				/></div>
			<div>
				<TextContentInput
					isAdmin={props.isAdmin}
					name={"col3"}
					value={props.value.col3}
					onChange={onChange}
					rows={10}
				/></div>

			</div>
			<Options isVisible={props.optionsMenuOpen} options={props.options} onOptionsChange={props.onOptionsChange} onOptionsHide={props.onOptionsHide} />

		</div>
	);
}