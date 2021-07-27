import PropTypes from 'prop-types';

export default function EditableTextarea(props) {
    return (
        <>
			{props.isAdmin &&
					<>
						<textarea className="popcms-textarea" type="text" name={props.name} value={props.value} onChange={props.onChange} />
					</>
			}
			{!props.isAdmin &&
					<>
						{props.value}
					</>
			}
		</>
	);
}

EditableTextarea.propTypes = {
    type: PropTypes.string,
}
