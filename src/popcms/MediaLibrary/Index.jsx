import React, { useEffect, useState }from "react";
import {
	Switch,
	Route,
	useRouteMatch,
    withRouter
} from "react-router-dom";
import { GetServerUrl } from './../ClientServerDataResolver.jsx';
import { GetUserAccessToken } from "../Index.jsx";
import QueryString from 'query-string';
import Layout from '../../Layout.jsx';
import AddMediaOverlay from './../components/AddMediaOverlay.jsx';

import { TextInput } from 'generic-cms-components';
import { OptimisedImage } from 'generic-cms-components';

function MediaLibrary(props) {
	const [isRunningClientSite, setIsRunningClientSite] = useState([]);
	useEffect(() => {
		setIsRunningClientSite(true);
	}, []);

	let routeMatch = useRouteMatch();

	function onEdit({ target }) {
		props.history.push(`${routeMatch.path}edit/?file=${target.name}`)
	}

	function onSave({ target }) {
		props.history.goBack();
	}

	function onExitEdit() {
		props.history.goBack();
	}

	return (
		<>
			{isRunningClientSite &&
				<Layout>
					<section id="media-library">	
						<h1>Media</h1>
						<Switch>
							<Route path={`${routeMatch.path}edit/`}>
								<FileEdit
									onSave={onSave}
									onCancel={onExitEdit}
									location={props.location}
									/>
								</Route>
							<Route path={routeMatch.path}>
								<FileList
									onEdit={ onEdit }
								/>
							</Route>
						</Switch>
					</section>
				</Layout>
				}
		</>
	);
}

function FileList(props) {
	const [isRunningClientSite, setIsRunningClientSite] = useState([]);
	const [files, setFiles] = useState([]);
	const [mediaOverlayVisible, setMediaOverlayVisible] = useState(false);


	useEffect(() => {
		setIsRunningClientSite(true);
	}, []);

	useEffect(() => {
		if (isRunningClientSite) {
			loadInitialData();
		}
	}, [isRunningClientSite])


	function onRefreshFileList() {
		loadInitialData();
	}

	function loadInitialData(callback) {
		LoadServerData()
			.then(x => setFiles(x));
	}

	return (
		<>
			<section id="media-library-list">
				<div className="buttons">
					<button onClick={() => setMediaOverlayVisible(true)}>upload</button>
						<AddMediaOverlay
							isVisible={mediaOverlayVisible}
							onHide={() => setMediaOverlayVisible(false)}
							onComplete={() => { onRefreshFileList(); setMediaOverlayVisible(false); }}
							value={props.settings}
						onChange={props.onSettingsChange} />
					<button onClick={onRefreshFileList }>refresh</button>
				</div>

				<div className="space"></div>
					<div className="row">
						{files.map(f => {
							return (
								<div key={f.uri} className="col-md-4">
									{parseInt(f.type) === 0 &&
										<OptimisedImage
											uri={f.uri}
											description={f.description}
											width={f.width}
											height={f.height}
										/>
										
									}
									<div className="image-information">
										<b>{f.name}</b><br />
										{f.description}<br />
										Url: {f.uri}<br />
										Copyright: {f.copyright}<br />
										Native width: {f.width}px<br />
										<button onClick={props.onEdit} name={f.name} target="_blank" className="btn btn-primary" >Edit</button><br />
									</div>
								</div>
							);
						})}
				</div>
			</section> 
		</>
	);
}

function FileEdit(props) {
	const [state, setState] = useState(props.value || {})
	const params = QueryString.parse(props.location.search);

	useEffect(() => {
		var filename = params.file;
		LoadServerDataForItem(filename)
			.then(x => setState(x));
	}, [])

	function onCancel(e) {
		props.onCancel();
		e.preventDefault();
	}

	function onSave(e) {
		e.preventDefault();
		SaveServerDataForItem(params.file, state)
			.then(() => {
				props.onCancel();
			});
	}

	function onChange({ target }) {
		var newState = { ...state, [target.name]: target.value };
		setState(newState);
	}

	return (
		<>
			<section id="edit-media">
				<h4>Edit media</h4>
				<form onSubmit={onSave}>
					<TextInput
						id="description"
						name="description"
						value={state.description}
						onChange={onChange}
					/>
					<TextInput
						id="copyright"
						name="copyright"
						value={state.copyright}
						onChange={onChange}
					/>
					<button className="btn btn-danger" onClick={onCancel} >Cancel</button>
					<input type="submit" className="btn btn-primary" value="Save" />
				</form>
			</section>
		</>
	);
}

async function LoadServerData() {
	return await PerformSecureApiCall("/api/media/");
}

async function LoadServerDataForItem(filename) {
	return await PerformSecureApiCall("/api/media/item/?filepath=" + encodeURI(filename));
}

async function SaveServerDataForItem(filename, data) {
	return await PerformSecureApiCall("/api/media/item/?filepath=" + encodeURI(filename), 'PUT', JSON.stringify(data));
}

export async function PerformSecureApiCall(url, method, data) {

	var token = await GetUserAccessToken()

	if (token !== null) {
		var bearer = "Bearer " + token;

		var dataResponse = await fetch(GetServerUrl() + url, {
			method: method || 'GET', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': bearer
			},
			body: data
		});
		var json = await dataResponse.json();
		return json;
	}

	return null;
}

export default withRouter(MediaLibrary);