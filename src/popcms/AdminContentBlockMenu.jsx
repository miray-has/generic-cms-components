import { useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

function AddElementAtIndexForm(props) {
	const [dropdownOpen, setOpen] = useState(false);

	const toggle = () => setOpen(!dropdownOpen);

	const options = props.pageItemOptions;

	function handleAddNew({ target }) {
		props.onAddNew(props.index, target.name);
	}

	return (
		<>
			<ButtonDropdown className="popcms-button" isOpen={dropdownOpen} toggle={toggle} direction="right">
				<DropdownToggle><FontAwesomeIcon icon={faPlusCircle} /></DropdownToggle>
				<DropdownMenu>
					<DropdownItem header>Add item {props.header}</DropdownItem>
					{options.map(o => { return <DropdownItem key={o.typeName} onClick={handleAddNew} name={o.typeName}>{o.prettyName || o.typeName}</DropdownItem> })}
				</DropdownMenu>
			</ButtonDropdown>
		</>
	);
}

function EditElementAtIndexForm(props) {
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);

	function handleDelete() {
		console.debug(`Delete ${props.index}`);
		props.onDelete(props.index);
	}
	function handleMoveUp() {
		console.debug(`Move item ${props.index} up`);
		props.onMoveUp(props.index);
	}
	function handleMoveDown() {
		console.debug(`Move item ${props.index} down`);
		props.onMoveDown(props.index);
	}

	return (
		<>
			<ButtonDropdown className="popcms-button" isOpen={dropdownOpen} toggle={toggle} direction="right">
				<DropdownToggle><FontAwesomeIcon icon={faPen} /></DropdownToggle>
				<DropdownMenu>
					<DropdownItem onClick={props.onOpenOptions} >Edit options</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={handleMoveUp} >Move up</DropdownItem>
					<DropdownItem onClick={handleMoveDown} >Move down</DropdownItem>
					<DropdownItem divider />
					<DropdownItem onClick={handleDelete} >Delete item</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		</>
	);
}

export default function AdminContentBlockMenu(props) {

	return (
		<>
			<div className="popcms-block-admin">
				<AddElementAtIndexForm pageItemOptions={props.pageItemOptions} onAddNew={props.onAddNew} index={props.index} header="above" />
				<EditElementAtIndexForm onAddNew={props.onAddNew} onDelete={props.onDelete} onMoveUp={props.onMoveUp} onMoveDown={props.onMoveDown} onOpenOptions={props.onOpenOptions} index={props.index} />
				<AddElementAtIndexForm onAddNew={props.onAddNew} pageItemOptions={props.pageItemOptions} index={props.index + 1} header="below" />
			</div>
		</>
	);
}

AddElementAtIndexForm.propTypes = {
	pageItemOptions: PropTypes.array.isRequired
};