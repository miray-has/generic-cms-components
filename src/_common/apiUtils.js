import { loginRequest } from '../auth/authProvider.jsx';
import Authentication, { msalInstance } from '../popcms/Authentication.jsx';

export async function getOptionsWithAuthHeader() {
	const token = await authProvider.getIdToken();
	const idToken = token.idToken.rawIdToken;
	return {
		headers: new Headers({
			'Authorization': 'Bearer ' + idToken,
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		})
	};
}

export async function getOptionsWithAuthHeaderForAxiosUpload() {
	const token = await GetUserAccessToken();
	return {
		'Authorization': 'Bearer ' + token,
		//'Accept': 'application/json',
		//'Content-Type': 'application/json'
	};
}


export async function GetUserAccessToken() {

	if (typeof (window) === "undefined" || window === null || window.location == null) {
		return false;
	}

	if (typeof (msalInstance) === "undefined" || msalInstance === null) {
		return false;
	}

	const accounts = msalInstance.getAllAccounts();

	if (accounts === null || accounts.length === 0) {
		return false;
	}

	const account = accounts[0];

	if (account == null) {
		return false;
	}

	const accessTokenRequest = {
		...loginRequest,
		account: account
	}

	var tokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);

	return tokenResponse.accessToken;

}


export async function sendDataItemToUrl(url, item, successHandler, returnFullObject) {
	var dataUrl = null;
	var data = null;
	var method = null;

	if (item.id) {
		// existing record
		dataUrl = url + item.id;
		method = "PUT";
		data = item;
	} else {
		dataUrl = url;
		method = "POST";
		// data needs a guid - use empty here
		data = { ...item, id: "00000000-0000-0000-0000-000000000000" }
	}

	var baseOptions = await getOptionsWithAuthHeader();
	var options = { ...baseOptions, body: JSON.stringify(data), method: method }

	if (returnFullObject && successHandler === null) {
		successHandler = handleResponse;
	}

	successHandler = successHandler || (async response => {
		if (!response.ok) await handleErrorResponse(response, dataUrl);
		return response.json().then(result => {
			return result.id;
		});
	});

	return (async () => {
		return fetch(dataUrl, options)
			.then(successHandler)
			.catch(handleError);
	})();
}

export async function putDataToUrl(url, data) {
	return (async () => {
		var header = await getOptionsWithAuthHeader();
		if (data != null) {
			header.body = JSON.stringify(data);
		}
		header.method = "PUT";
		return fetch(url, header)
			.then(handleResponse)
			.catch(handleError);
	})();
}

export async function getDataFromCacheOrUrl(url) {
	return (async () => {
		var cachedData = localStorage.getItem(url) || null;
		console.debug("CACHE?");
		if (cachedData !== null) {
			console.debug("Getting " + url + " FROM LOCAL STORAGE");
			return Promise.resolve(JSON.parse(cachedData));
		} else {
			console.debug("Getting " + url + " FROM SERVER");
			return fetch(url, await getOptionsWithAuthHeader())
				.then(response => response.json())
				.then(json => { 
					localStorage.setItem(url, JSON.stringify(json));
					return json;
				
				})
				.catch(handleError);
		}
	})();
}

export async function getDataFromUrl(url) {
	return (async () => {
		return fetch(url, await getOptionsWithAuthHeader())
			.then(handleResponse)
			.catch(handleError);
	})();
}

export async function getBlobFromUrl(url) {
	return (async () => {
		return fetch(url, await getOptionsWithAuthHeader())
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'Consignment.zip';
					a.click();
				});
				//window.location.href = response.url;
			})
			.catch(handleError);
	})();
}

export async function getResultsFromDataAtUrl(url, returnEmptyIfNotFound) {
	returnEmptyIfNotFound = returnEmptyIfNotFound || false;
	return (async () => {
		return fetch(url, await getOptionsWithAuthHeader())
			.then(async response => {
				if (!response.ok) await handleErrorResponse(response, url);
				return response.json().then(result => {
					if (!result.results && !returnEmptyIfNotFound) throw new Error("Item not found");
					return result.results;
				});
			})
			.catch(handleError);
	})();
}

export async function deleteItemAtBaseUrl(baseUrl, item) {
	const baseOptions = await getOptionsWithAuthHeader();
	const options = { ...baseOptions, method: "DELETE" }
	return fetch(baseUrl + item.id, options)
		.catch(handleError);
}

function areAnyValidSearchValues(searchParams) {
	var anyValidSearchValues = false;

	Object.keys(searchParams).map(function (key) {
		if (searchParams[key] !== null && searchParams[key] !== "") {
			anyValidSearchValues = true;
		}
		return key;
	});
	return anyValidSearchValues;
}

export function urlForSearch(startOfUrl, searchParams, keyPrefix) {
	keyPrefix = keyPrefix || "";
	var url = startOfUrl;

	// generate key/values for entered values
	var searchString = "?";
	if (searchParams !== null && areAnyValidSearchValues(searchParams)) {
		for (const [key, value] of Object.entries(searchParams)) {
			if (key === "page") {
				continue;
			}
			if (value !== null && value !== "") {
				searchString += keyPrefix + key + '=' + encodeURIComponent(value) + "&";
			}
		}
	}

	// sort paging
	var pagingUrl = null;
	if (typeof (searchParams.page) !== "undefined" && searchParams.page !== null) {
		pagingUrl = "page=" + parseInt(searchParams.page);
	}

	if (searchString !== "?") {
		// we have some values
		searchString = searchString.slice(0, -1);
		url += searchString;
		if (pagingUrl !== null) {
			url += "&" + pagingUrl;
		}
	} else {
		if (pagingUrl !== null) {
			url +=  "?" + pagingUrl;
		}
	}

	return url;
}



export async function handleErrorResponse(response, url) {
	url = url || response.url;
	const error = await response.text();
	throw new Error("From Url: \"" + url + "\" error: " + error);
}

export async function handleResponse(response) {
	if (response.ok) return response.json();
	if (response.status === 400) {
		// So, a server-side validation error occurred.
		// Server side validation returns a string error message, so parse as text instead of json.
		const error = await response.text();
		throw new Error(error);
	}
	await handleErrorResponse(response);
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
	// eslint-disable-next-line no-console
	console.error("API call failed. " + error);
	throw error;
}
