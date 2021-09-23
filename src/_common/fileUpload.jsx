import React, { useRef, useState } from 'react';
import axios from 'axios';
import * as apiUtils from './apiUtils.js';
import PropTypes from 'prop-types';

function FileUpload(props) {
	const [dataToSend, setDataToSend] = useState(props.paramatersToSend || {});
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [showProcessing, setShowProcessing] = useState(false);
	const [showSummary, setShowSummary] = useState(false);
	const el = useRef();

	const handleChange = (e) => {
		setProgress(0);

		const files = e.target.files;
		const targetToClear = e.target;
		const formData = new FormData();

		for (var i = 1; i <= files.length; i++) {
			formData.append("files", files[i - 1]);
		}

		for (const property in dataToSend) {
			console.debug("adding property", property);
			console.debug("adding property value", dataToSend[property]);
			formData.append(property,dataToSend[property]);
		}

		apiUtils.getOptionsWithAuthHeaderForAxiosUpload().then((headers) => {
			axios.post(props.url || '/api/fileupload/',
				formData,
				{
					headers: headers,
					onUploadProgress: (ProgressEvent) => {

						let p = Math.round(
							ProgressEvent.loaded / ProgressEvent.total * 100);
						setProgress(p + '%');
						if (p === 100) {
							setShowProcessing(true);
						}
					}
				})

				.then(res => {
					targetToClear.value = "";

					var newUploadedFiles = [...uploadedFiles, ...res.data.results];

					setUploadedFiles(newUploadedFiles);
					setShowProcessing(false);
					setShowSummary(true);
					console.debug(newUploadedFiles);
					console.debug(showSummary);

					if (props.onNewFilesUploaded) { props.onNewFilesUploaded(res.data.results); }
				})
				.catch(error => {
					if (error.response) {
						setErrorMessage(error.response.data)
						console.debug(error.response.data);
					}
					setShowProcessing(false);
				});
		});
	}

	function previewFile(file) {
		//	let reader = new FileReader();
		//	reader.readAsDataURL(file);
		//	reader.onloadend = function () {
		//		let img = document.createElement('img');
		//		img.src = reader.result;
		//		document.getElementById('gallery').appendChild(img);
		//	}
	}

	return (
		<div>
			<div id="fileupload">
				{progress === 0 &&
					<>
						<input type="file" ref={el} onChange={handleChange} accept={props.accept} multiple /><br />
						<div id="gallery"></div>
						<div className="progessBar" style={{ width: progress }}>
							{progress}
						</div>
					</>
				}
				{showProcessing &&
					<>
						<p><strong><img src="/img/loading.gif" /> Processing - </strong> please do not navigate away from this page while in progress.</p>
					</>
				}
				{errorMessage && <div className="danger"><p>{errorMessage}</p></div>}
				{showSummary &&
					<div>
						<strong>{uploadedFiles.length} file(s) uploaded:</strong>
						<ul>
							{uploadedFiles.map(f => (
								<li key={f.name}>{f.name}
									{f.summary && <ul> {f.summary.map(s => (<li key={s}>{s}</li>))} </ul>}
								</li>))}
						</ul>
					</div>}
			</div>
		</div>
	);
}

FileUpload.propTypes = {
	url: PropTypes.string.isRequired,
	onNewFilesUploaded: PropTypes.func,
	accept: PropTypes.string // eg. image/png, image/gif, image/jpeg
}

export default FileUpload;