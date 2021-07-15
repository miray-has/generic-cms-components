import { useState, useEffect } from 'react';

// MSAL imports
import { MsalProvider, MsalAuthenticationTemplate, withMsal } from "@azure/msal-react";
import { PublicClientApplication, EventType, InteractionType  } from "@azure/msal-browser";
import { getMsalConfig, loginRequest, graphConfig  } from '../auth/authProvider.jsx';
import { GetUserAccessToken } from './Index.jsx';

export let msalInstance = typeof(window) !== "undefined" ? new PublicClientApplication(getMsalConfig()) : null;

export default function Authentication(props) {
	const [state, setState] = useState({ error: "" });

	if (msalInstance) {

		let accounts = msalInstance.getAllAccounts();
		if (accounts.length > 0) {
			msalInstance.setActiveAccount(accounts[0]);
		}
		msalInstance.addEventCallback((event) => {
			if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
				const account = event.payload.account;
				msalInstance.setActiveAccount(account);
			}
		});
	}

	const authRequest = {
		...loginRequest
	};

	return (
		<React.Fragment>
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
		</React.Fragment>
	);
}

//export let idToken = { value: null };
export let accessToken = { value: null };

function AuthenticatedContentContainer(props) {
	const [state, setState] = useState({ loggedIn: false});

	useEffect(() => {
		GetUserAccessToken()
			.then(t => {

				accessToken.value = t;
				if (t !== null) {
					setState({ loggedIn: true, t });
				}
				else { 
					setState({ loggedIn: false, t: null });
				}
			});
	}, []);

	return (
		<React.Fragment>
			{state.loggedIn &&
				<React.Fragment>
					{props.children}
			</React.Fragment>
			}
			{!state.loggedIn &&
				<React.Fragment>
					<h1>Not logged in</h1>
				</React.Fragment>
			}
		</React.Fragment>
		)
}

const Loading = () => {
	return <h6>Authentication in progress...</h6>
}

const ErrorComponent = ({ error }) => {
	return <h6>An Error Occurred: {error.errorCode}</h6>;
}