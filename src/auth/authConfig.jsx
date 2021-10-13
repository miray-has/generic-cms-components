
var cacheSettings = null;

export async function Configuration() {
	return new Promise(function(resolve, reject) {
		if(cacheSettings != null){
			resolve(cacheSettings);
		}
		else
		{
			return fetch('/client-config.json',
			{
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
			.then((response) => response.json())
			.then((responseData) => {
				//console.log("client-config", responseData);
				cacheSettings  = responseData;
				resolve(responseData);
			})
			.catch(error => {
				console.error(error);
				resolve(null, error);
			});
		}

		resolve('start of new promise');
	});

}