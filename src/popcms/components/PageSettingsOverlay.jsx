import { useEffect, useState } from 'react';

import { Overlay } from 'generic-cms-components';
import { TextInput } from 'generic-cms-components';

export default function PageSettingsOverlay(props) {
	const [state, setState] = useState(props.value);

	useEffect(() => {
		if (props.value != null) {
			setState(props.value);
		}
	}, [props.value]);

	function onChange({ target }) {
		setState({...state, [target.name]: target.value});
	}

	function onSave() {
		props.onChange(state);
		props.onHide();
	}

	function onHide() {
		props.onHide();
	}

	function reset() {
		setState(props.pageSettings);
	}

	return (
		<Overlay
			visible={props.isVisible}
			onHide={props.onHide}
		>
			<h2>Page settings</h2>
			<div className="pageSettingsContainer">

				<TextInput
					label="Title"
					name="title"
					value={state.title}
					onChange={onChange}
				/>
				<TextInput
					label="Keywords"
					name="keywords"
					value={state.keywords}
					onChange={onChange}
				/>
				<TextInput
					label="Description"
					name="description"
					value={state.description}
					onChange={onChange}
				/>
				<TextInput
					label="Snippet (lead in)"
					name="snippet"
					value={state.snippet}
					onChange={onChange}
				/>
				<TextInput
					label="Image Url"
					name="imageUrl"
					value={state.imageUrl}
					onChange={onChange}
				/>
				<TextInput
					label="Author"
					name="author"
					value={state.author}
					onChange={onChange}
				/>
				<TextInput
					label="Tags"
					name="tags"
					value={state.tags}
					onChange={onChange}
				/>
				<TextInput
					label="Page css class"
					name="pageCssClass"
					value={state.pageCssClass}
					onChange={onChange}
				/>
				<TextInput
					label="Sort list"
					name="sortList"
					value={state.sortList}
					onChange={onChange}
				/>
			</div>

			<button onClick={onHide} className="btn btn-danger mr-1" >Cancel</button>
			<button onClick={onSave} className="btn btn-primary" >Save</button>
		</Overlay>
	);
}