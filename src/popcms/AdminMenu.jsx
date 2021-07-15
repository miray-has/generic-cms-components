import { useEffect, useState } from 'react';
import Overlay from '../_common/_overlay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faSave, faSignOutAlt, faSignInAlt, faPlus, faUpload, faSpinner, faFileImport, faImages} from '@fortawesome/free-solid-svg-icons'
import PageSettingsOverlay from './overlayComponents/PageSettingsOverlay.jsx';
import PublishOverlay from './overlayComponents/PublishOverlay.jsx';
import AddPageOverlay from './overlayComponents/AddPageOverlay.jsx';
import { Link } from 'react-router-dom';
import { isUserLoggedIn } from './Index.jsx';

export default function AdminMenu(props) {
	const [pageSettingsVisible, setPageSettingsVisible] = useState(false);
	const [publishOverlayVisible, setPublishOverlayVisible] = useState(false);
	const [newPageVisible, setNewPageVisible] = useState(false);
	const [logoutCheckVisible, setLogoutCheckVisible] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	function onLogoutPressed() {
		props.onLogoutPressed();
		setLogoutCheckVisible(false);
	}

	useEffect(() => {
		isUserLoggedIn()
			.then(x => setIsAuthenticated(x));
	}, []);

	useEffect(() => {
		console.debug("isAuthenticated effect", isAuthenticated);
	}, [isAuthenticated])

	return (
		<nav id="admin-nav">
			<ul>
				{!isAuthenticated &&
					<li>
					<form>
						<Link className="btn btn-primary" to='/login/' id="login" title="Sign in"><FontAwesomeIcon icon={faSignInAlt} /></Link>
						</form>
					</li>
				}
				{isAuthenticated &&
					<React.Fragment>
						<li>
							{!props.isSaving &&
								<button className="btn btn-primary" onClick={props.onSaveCurrentPage}><FontAwesomeIcon icon={faSave} /></button>}
							{props.isSaving &&
								<button className="btn btn-primary spinner" onClick={() => { return false }}><FontAwesomeIcon icon={faSpinner} /></button>}
						</li>
						<li>
							<button className="btn btn-primary" onClick={() => setPageSettingsVisible(true)}><FontAwesomeIcon icon={faCogs} /></button>
							<PageSettingsOverlay
								isVisible={pageSettingsVisible}
								onHide={() => setPageSettingsVisible(false)}
								value={props.settings}
								onChange={props.onSettingsChange} />
						</li>
						<li>
							<button className="btn btn-primary" onClick={() => setNewPageVisible(true)}><FontAwesomeIcon icon={faPlus} /></button>
							<AddPageOverlay
								isVisible={newPageVisible}
								onSave={props.onSaveNewPage}
								onHide={() => setNewPageVisible(false)} />
						</li>
						<li> 
						<Link to="/admin/media/" ><button className="btn btn-primary"><FontAwesomeIcon icon={faImages} /></button></Link>
						</li>
						<li>
							<button className="btn btn-primary" onClick={() => setPublishOverlayVisible(true)}><FontAwesomeIcon icon={faUpload} /></button>
								<PublishOverlay
									isVisible={publishOverlayVisible}
									onHide={() => setPublishOverlayVisible(false)} />
						</li>

						<li>
							<button className="btn btn-danger" id="logout" onClick={() => setLogoutCheckVisible(true)}><FontAwesomeIcon icon={faSignOutAlt} /></button>
							<Overlay
								visible={logoutCheckVisible}
								onHide={() => setLogoutCheckVisible(false)}
							>
								<h2>Sign out</h2>
								<p>Are you sure?</p>
								<button onClick={() => setLogoutCheckVisible(false)} className="btn btn-danger-outline" >Cancel</button>
								<button onClick={onLogoutPressed} className="btn btn-primary" id="logout-confirm">Sign out</button>
							</Overlay>
						</li>
					</React.Fragment>
				}
			</ul>
		</nav>
	);
}