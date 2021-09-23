//import * as msal from "@azure/msal-browser";
//import { LogLevel } from "@azure/msal-browser";

export function getMsalConfig() {

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

	// Config object to be passed to Msal on creation
	const msalConfig = {
		auth: {
			clientId: "f2cc3ccc-5244-4da5-b610-3a10cad345c8",
			authority: "https://login.microsoftonline.com/ed0a539d-3623-432d-a192-ba4a50e762a7"
		},
		cache: {
			cacheLocation: "localStorage",
			storeAuthStateInCookie: false
		}
	};

	return msalConfig;
}


// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
	redirectUri: "/login/",
	postLogoutRedirectUri: "/",
	scopes: ["api://8a58b3b3-4787-4b63-b8dc-5f06ce92eb76/content.edit"]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};