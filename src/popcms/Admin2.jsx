import { useState, useEffect } from 'react';

// MSAL imports

import { MsalProvider, MsalAuthenticationTemplate, withMsal } from "@azure/msal-react";
import { PublicClientApplication, EventType, InteractionType, InteractionStatus  } from "@azure/msal-browser";
import { getMsalConfig, loginRequest, graphConfig  } from '../../auth/authProvider.jsx';

export let msalInstance;

export default function Admin2(props) {
	const [state, setState] = useState({ error: "" });
	msalInstance = new PublicClientApplication(getMsalConfig());
	const accounts = msalInstance.getAllAccounts();
	if (accounts.length > 0) {
		msalInstance.setActiveAccount(accounts[0]);
	}

	msalInstance.addEventCallback((event) => {
		if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
			const account = event.payload.account;
			msalInstance.setActiveAccount(account);
		}
	});

	useEffect(() => { 
		// DEVNOTE: handled this way to avoid server side issues... 
		// maybe a simpler option to block if window is null/undefined?

		// Account selection logic is app dependent. Adjust as needed for different use cases.
		
	}, [])

	const authRequest = {
		...loginRequest
	};

	return (
		<>
			<MsalProvider instance={msalInstance}>
				<MsalAuthenticationTemplate
					interactionType={InteractionType.Redirect}
					authenticationRequest={authRequest}
					errorComponent={ErrorComponent}
					loadingComponent={Loading}
				> 
					<AuthenticatedContentContainer children={props.children} msalInstance={msalInstance } />
				</MsalAuthenticationTemplate>
			</MsalProvider>
				<pre>{state.error}</pre>
		</>
	);
}


export function getAccessToken() {
	return sessionStorage.getItem('accessToken') || 'unset';
}

export let idToken = { value : null};

function AuthenticatedContentContainer(props) {
	const [state, setState] = useState({ loggedIn: false});

	useEffect(() => {

		const account = props.msalInstance.getActiveAccount();
		if (!account) {
			throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
		}

		props.msalInstance.acquireTokenSilent({
			...loginRequest,
			account: account
		}).then(response => {
			//const bearer = `Bearer ${PublicClientApplication}`;
			//console.log("Token acquired", response.idToken);
			idToken.value = response.idToken;
			setState({ loggedIn: true,  t: response.idToken });
		});

	}, []);

	return (
		<>
			{state.loggedIn &&
				<>
					{props.children}
				</>
			}
			{!state.loggedIn && <>
				<h1>Not logged in</h1>
			</>}
		</>
		)
}

const Loading = () => {
	return <h6>Authentication in progress...</h6>
}

const ErrorComponent = ({ error }) => {
	return <h6>An Error Occurred: {error.errorCode}</h6>;
}