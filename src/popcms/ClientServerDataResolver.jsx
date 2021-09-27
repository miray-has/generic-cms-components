import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getCmsHostName } from './Host/CmsHostName.jsx';
import Admin from './Index.jsx';

export default function ClientServerDataResolver(props) {
	let location = useLocation();
	const [state, setState] = useState(processServerValue(props.page));

	function isString(value) {
		return typeof value === 'string' || value instanceof String;
	}

	useEffect(() => {
		if (state.title === "temp" || state.pageUrl !== location.pathname) {
			// loaded, but the content wasn't prerendered
			console.debug("location.pathname changed " + location.pathname);
			loadPageContent();
		}
		else {
			console.debug("location.pathname changed but not title===templ " + location.pathname);
		}
	}, [location]);

	function getEmptyPageContent() {
		return {
			title: "temp", content: {
				items: []
			}
		};
	}

	function processServerValue(serverData) {
		if (serverData == null) {
			return getEmptyPageContent();
		}

		console.debug("processServerValue -> settings.pageUrl / location.pathname", serverData?.pageUrl, location?.pathname);

		if (typeof (location) !== "undefined" && serverData?.pageUrl !== location?.pathname) {
			// this will be the entry page content, which we're not interested in now
			// as the user has navigated away
			console.debug(`processServerValue -> Ignoring content for ${serverData?.pageUrl} as we want ${location?.pathname}`)

			// we need to provide a response to this, 
			// but as we don't have the relevant data, 
			// let's hold fire
			return getEmptyPageContent();
		}

		if (serverData.content.items && serverData.content.items.length > 0) {
			console.debug("received value for items");
			if (isString(serverData.content.items)) {
				console.debug("received value for items (String)");
				serverData.content.items = JSON.parse(serverData.content.items);
			}
			else {
				console.debug("received value for items (" + typeof serverData.content.items + ")");
				return serverData;
			}
		}
		else {
			serverData.content.items = []
		}
		return serverData;
	}

	function loadPageContent() {

		getCmsHostName()
			.then(cmsHostName => {

				const url = "https://" + cmsHostName + location.pathname;
				fetch(url, {
					method: 'GET', // or 'PUT'
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					}
				})
					.then(response => response.json())
					.then(data => {
						console.debug(`Success downloading: ${url}`, data);
						var newData = processServerValue(data);
						console.debug("SettingState");
						console.debug(newData);
						setState(newData);
					})
					.catch((error) => {
						setState({ error: JSON.stringify(error, null, 4) });
						console.error('Error:', error);
					});
			})
	}

	return (
		<>
			<Admin page={state} layout={props.layout} pageItem={props.pageItem} pageItemOptions={props.pageItemOptions} />
		</>
	);
}

ClientServerDataResolver.propTypes = {
	layout: PropTypes.func.isRequired,
	pageItem: PropTypes.func.isRequired,
	pageItemOptions: PropTypes.array.isRequired
};