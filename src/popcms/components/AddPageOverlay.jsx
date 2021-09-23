import { useEffect, useState } from 'react';

import { Overlay } from 'generic-cms-components';
import { TextInput } from 'generic-cms-components';

export default function AddPageOverlay(props) {
	const [newPage, setNewPage] = useState({ permalink: "/" });

	const handleChange = function ({ target }) {
		setNewPage({ ...newPage, [target.name]: target.value });
	}

	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const handleSubmit = function (event) {
		props.onSave(
			{
				templateName: "Home",
				redirectUrl: "",
				title: newPage.title,
				pageUrl: newPage.permalink.replace(/\s/g, ''),
				userId: uuidv4(),
				id: uuidv4(),
				updatedDateTime: new Date(),
				content: {  }
			},
			() => {
				window.location = newPage.permalink.replace(/\s/g, '')
			}
		);
		event.preventDefault();
	}

	return (
		<Overlay
			visible={props.isVisible}
			onHide={props.onHide}
		>
			<form onSubmit={ handleSubmit } method="post">
				<h2>New page settings</h2>
				<TextInput
					label="Title"
					name="title"
					value={newPage.title}
					onChange={handleChange}
				/>
				<TextInput
					label="Permalink"
					name="permalink"
					value={newPage.permalink}
					onChange={handleChange}
				/>
				<input type="submit" className="btn btn-primary" value="Continue" />
			</form>
		</Overlay>
	);
}