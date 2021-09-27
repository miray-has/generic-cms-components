import { Configuration } from '../../auth/authConfig.jsx';

export async function getCmsHostName() {
	return new Promise(function (resolve, reject) {

		Configuration()
			.then(config => {
				resolve(config.cmsHostName);
			});

	});
}


export async function isHostACmsHostName() {
	return new Promise(function (resolve, reject) {
		if (typeof (window) === "undefined" || window === null || window.location == null) {
			resolve(false);
		}
		let host = window.location.host;

		Configuration()
			.then(config => {				
				const cmsHostName = config.cmsHostName;
				const isCmsHostName = (host === cmsHostName);
				resolve(isCmsHostName);
			});

	});
}
