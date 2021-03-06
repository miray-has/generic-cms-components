import { Configuration } from './authConfig.jsx';

export async function getMsalConfig() {

	if (window == null) {
		return null;
	}

	// Browser check variables
	// If you support IE, our recommendation is that you sign-in using Redirect APIs
	// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
	const ua = window.navigator.userAgent;
	const msie = ua.indexOf("MSIE ");
	const msie11 = ua.indexOf("Trident/");
	const msedge = ua.indexOf("Edge/");
	const firefox = ua.indexOf("Firefox");
	const isIE = msie > 0 || msie11 > 0;
	const isEdge = msedge > 0;
	const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

	console.debug("Getting client config");

	const config = await Configuration();




	// Config object to be passed to Msal on creation
	const msalConfig = {
		auth: {
			//clientId: config.clientId,
			//Authority: config.authority,
			//postLogoutRedirectUri: "/",

			clientId: "bce3872e-afcd-456d-9420-0a50e7e91667",
			authority: "https://login.microsoftonline.com/5653eccb-d8e1-48e9-aea3-82db6381f7dd/",
			redirectUri: "/login/",
			postLogoutRedirectUri: "/",

		},
		cache: {
			cacheLocation: "localStorage",
			storeAuthStateInCookie: false
		}
	};

	return msalConfig;
}


// Add here scopes for id token to be used at MS Identity Platform endpoints.
export async function getLoginRequest() {
	const config = await Configuration();

	const loginRequest = {
		redirectUri: "/login/",
		postLogoutRedirectUri: "/",
		scopes: config.scopes
	}

	console.debug("loginRequest", loginRequest);
	return loginRequest;
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};