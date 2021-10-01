import { useState } from 'react';
import ImageContentInput from '../_common/_imageContentInput.jsx';

export default function ColumnImage(props) {

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

	function linkEventHandler(e) {
		console.log(e);
		props.toLink(props.link, e);
	}

	return (
		<div onClick={linkEventHandler}>
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

