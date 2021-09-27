import { useState } from 'react';
import { GetUserAccessToken } from '../user/AccessToken.jsx';
import { getCmsHostName } from '../Host/CmsHostName.jsx';
import Overlay from '../../_common/_overlay.jsx';

export default function PublishOverlay(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState({});

	async function doPublish() {
		if (isLoading) {
			return;
		}
		setIsLoading(true);
		var accessToken = await GetUserAccessToken();

		var bearer = "Bearer " + accessToken;

		var cmsHostName = await getCmsHostName();

		fetch("https://" + cmsHostName + "/api/publish/", {
			method: 'GET', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
				'Authorization': bearer
			}
		})
			.then(response => response.json())
			.then(json => {
				setIsLoading(false);
				setResult(json);
			})
			.catch((error) => {
				setIsLoading(false);
				setResult(error);
			});
	}

	return (
		<Overlay
			visible={props.isVisible}
			onHide={props.onHide}
		>
			<h2>Publish site</h2>
			{!isLoading &&
				<button className="btn btn-primary" onClick={doPublish} > Publish site</button>
			}
			{isLoading &&
				<div className="lds-hourglass"></div>
			}
		</Overlay>
	);
}