import Overlay from '../../_common/_overlay.jsx';

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