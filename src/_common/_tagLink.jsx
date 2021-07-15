import { Link } from 'react-router-dom';

export default function TagLink(props) {

    function filterTagSelected() {
        props.onTagSelected(props.tag);
        props.tagClicked(props.tag);
    }

    return <li key={props.tag}>
        <button
            onClick={filterTagSelected}
            className={props.className}>{props.tag}
        </button>
    </li>
}