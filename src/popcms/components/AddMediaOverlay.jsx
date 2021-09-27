import { useState } from 'react';

import FileUpload from '../../_common/fileUpload.jsx';
import TextInput from '../../_common/TextInput.js';
import Overlay from '../../_common/_overlay.jsx';

export default function AddMediaOverlay(props) {
	const [state, setState] = useState({ originalPixelDensity : 3, stage: 0 });

	const handleChange = function ({ target }) {	
		setState({ ...state, [target.name]: target.value });
	}



	const handleSubmit = function (event) {
		event.preventDefault();
		if (isNaN(state.originalPixelDensity)) {
			return;
		}
		setState({ ...state, stage : 1});
	}

	const handleStage2Submit = function (event) {
		event.preventDefault();
		setState({ originalPixelDensity: 3, stage: 0 });
		props.onComplete();
	}

	return (
		<Overlay
			visible={props.isVisible}
			onHide={props.onHide}
		>
			{ state.stage === 0 &&
				<form onSubmit={handleSubmit}>
					<h2>Upload settings</h2>
					<TextInput
					label="Original pixel density (e.g. 1, 1.5, 2, 3)"
					id="originalPixelDensity"
					name="originalPixelDensity"
					value={state.originalPixelDensity}
					onChange={ handleChange }
					/>
					<input type="submit" className="btn btn-primary" value="Continue" />
				</form>
			}

			{state.stage === 1 && 
				<form onSubmit={handleStage2Submit}>
					<h2>Select new image files</h2>
					<FileUpload
						url="/api/media/upload/"
						paramatersToSend={{ originalSize: state.originalPixelDensity }}
						accept="image/png, image/gif, image/jpeg"
					/>
					<input type="submit" className="btn btn-primary" value="Done" />
				</form>
			}


		</Overlay>
	);
}

