import { useState, useEffect } from 'react';

// MSAL imports
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { getMsalConfig, getLoginRequest } from '../auth/authProvider.jsx';
import { GetUserAccessToken } from './user/AccessToken.jsx';
import { Link } from 'react-router-dom';

//export let msalInstance;

export async function getMsalInstance() {
	return new Promise(function (resolve, reject) {
		getMsalConfig()
			.then(config => {
				const _msalInstance = new PublicClientApplication(config);

				let accounts = _msalInstance.getAllAccounts();
				if (accounts.length > 0) {
					_msalInstance.setActiveAccount(accounts[0]);
				}
				_msalInstance.addEventCallback((event) => {
					if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
						const account = event.payload.account;
						_msalInstance.setActiveAccount(account);
					}
				});
				resolve(_msalInstance);
			});
	})
}

export default function Authentication(props) {
	const [state, setState] = useState({ error: "" });
	const [msalInstance, setMsal] = useState(null);
	const [authRequest, setAuthRequest] = useState(null);
	const [accountId, setAccoiuntId] = useState(null);

	useEffect(() => {
		async function fetchConfig() {
			if (typeof (window) === "undefined") {
				console.log("window undefined");
				return;
			}
			const _msalInstance = await getMsalInstance();


			console.log("msalInstance", "Getting");
			setMsal(_msalInstance)
			console.log("msalInstance", _msalInstance);
			console.log("authRequest", "Getting");
			const _authRequest = await getLoginRequest();
			console.log("authRequest", _authRequest);
			setAuthRequest(_authRequest);


			_msalInstance.loginPopup(_authRequest)
				.then(function (loginResponse) {
					setAccoiuntId(1);
					// Display signed-in user content, call API, etc.
				}).catch(function (error) {
					//login failure
					console.log(error);
				});
		}
		fetchConfig();
		console.log("authRequest", "fetchConfig()");
	}, [])


	return (
		<>{(accountId) ?
			<><p>Logged in</p></>
			:
			<><p>Not logged in</p></>
		}
		</>
	);
}

//export let idToken = { value: null };
export let accessToken = { value: null };

function AuthenticatedContentContainer(props) {
	const [state, setState] = useState({ loggedIn: false });

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
		<>
			{state.loggedIn &&
				<>
					<h1>Logged in</h1>
					<Link to='/'>Continue</Link>
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