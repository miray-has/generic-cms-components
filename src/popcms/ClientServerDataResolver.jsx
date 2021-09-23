import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
		const url = GetServerUrl() + location.pathname;
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

	}

	return (
		<>
			<Admin page={state} />
		</>
	);
}

export function GetServerUrl() {
	if (typeof (window) !== "undefined" && window != null) {
		var host = window.location.host;
		if (host.indexOf(':') > 0) {
			host = host.substring(0, host.indexOf(':'));
		}
		if (host.indexOf('.') > 0) {
			host = host.substring(0, host.indexOf('.'));
		}
		console.debug("running on " + host);
		switch (host) {
			case "localhost":
			case "eastpoint-2021":
			case "cms":
			case "dev":
			case "staging": {
				// for the development env, or cms env, use the same server
				return "";
			}
		}
		// otherwise, we're on static hosting, so use the CMS
		return "https://eastpoint-2021.azurewebsites.net";
	}
}