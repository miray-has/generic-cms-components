import { useEffect, useState } from 'react';
import { TextInput, Overlay } from 'generic-cms-components';
import { EditableTextarea } from 'generic-cms-components';
import * as moment from 'moment';

export default function BlogBanner(props) {
	const [state, setState] = useState({
		title: props.value?.title,
	});

	const date = moment(props.settings.updatedDateTime).format('DD MMM, YYYY').replace(/,/g, '');

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

	function cssClass() {
		return `${typeof (props.options.cssClass) != "undefined" ? props.options.cssClass : ""}`;
	}

	return (
		<div className="banner blog-banner">
			<div className={cssClass()}>
				<div>
				<EditableTextarea
					name="title"
					value={state.title}
					isAdmin={props.isAdmin}
					onChange={onChange}
				/></div>
				{window.location.pathname.includes('/blog') &&
					<p>
						By {props.settings?.settings.author && props.settings.settings.author}
						, {props.settings?.updatedDateTime && date}

					</p>
				}
				{window.location.pathname.includes('/case-studies') &&
					<p>
						<span>Case studies</span> / {props.settings?.settings.title}
					</p>
				}
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
				<button onClick={props.onHide} className="btn btn-danger">Cancel</button>
				<input type="submit" className="btn btn-primary" value="Continue" />
			</form>
		</Overlay>
	)
}