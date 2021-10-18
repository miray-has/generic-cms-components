import { useState } from 'react';
import ImageContentInput from '../_common/_imageContentInput.jsx';

export default function ColumnImageWithText(props) {

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
					rows={10}
				/>
				<div>
					{props.isAdmin &&
						<>
							<div>
								<h4>
									<input type="text" name="header" value={state.header} onChange={onChange} />
								</h4>
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
							<div>{props.link}</div>
							<div><p>{state.subtext}</p></div>
						</>
					}
				</div>
			</div>
		</div>
	)
}

