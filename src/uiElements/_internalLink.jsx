import { Link } from 'react-router-dom';

export default function InternalLink(props) {
	return <h1><Link to={props.url}>{props.text}</Link></h1>
}