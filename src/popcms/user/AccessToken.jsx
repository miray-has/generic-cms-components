import { getMsalInstance } from '../Authentication.jsx';
import { getLoginRequest } from '../../auth/authProvider.jsx';

export async function GetUserAccessToken() {

	if (typeof (window) === "undefined" || window === null || window.location == null) {
		return false;
	}

	var msalInstance = await getMsalInstance();

	if (typeof (msalInstance) === "undefined" || msalInstance === null) {
		console.error("GetUserAccessToken", "No msalInstance available", msalInstance)
		return false;
	}

	const accounts = msalInstance.getAllAccounts();

	if (accounts === null || accounts.length === 0) {
		console.error("GetUserAccessToken", "No accounts available", accounts)
		return false;
	}

	const account = accounts[0];

	if (account == null) {
		console.error("GetUserAccessToken", "Accounts is null")
		return false;
	}

	var loginRequest = await getLoginRequest();

	const accessTokenRequest = {
		...loginRequest,
		account: account
	}

	var tokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);

	return tokenResponse.accessToken;

}

export async function isUserLoggedIn() {

	var accessToken = await GetUserAccessToken();

	if (accessToken)
		return true;
	else
		return false;
	
}