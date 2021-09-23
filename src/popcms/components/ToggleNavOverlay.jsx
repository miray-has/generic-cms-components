import { useEffect, useState } from 'react';

import { Overlay } from 'generic-cms-components';
import { TextInput } from 'generic-cms-components';


export default function ToggleNavOverlay(props) {

	return (
		<Overlay
			visible={props.isVisible}
			onHide={props.onHide}
		>
			<h2>Page settings</h2>
			<div className="pageSettingsContainer">

				
			</div>

		</Overlay>
	);
}