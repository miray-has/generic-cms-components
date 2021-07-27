import PropTypes from 'prop-types';
import { Link, StaticRouter as Router } from 'react-router-dom';

export default function EditableInput(props) {
	return (
		<>
			{props.isAdmin &&
					<>
						<input className="popcms-input" type="text" name={props.name} value={props.value} onChange={props.onChange} />
					</>
			}
			{!props.isAdmin &&
				<>
					<Router>
						<Link to={props.link}>
							{props.value}
						</Link>
					</Router>

					</>
			}
		</>
    );
}

EditableInput.propTypes = {
	type: PropTypes.string,
	link: PropTypes.string,
}

EditableInput.defaultProps = {
	link: ""
};