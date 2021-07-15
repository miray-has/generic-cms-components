import { useState, useEffect, Children } from 'react';
import { Link } from 'react-router-dom';


export default function Overlay(props) {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		if (typeof (window) === "undefined" || window === null) return;

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);

	}, []);

	function getWindowDimensions() {
		if (typeof (window) === "undefined" || window === null) return;
		const { innerWidth: width, innerHeight: height } = window;
		//console.debug({
		//	width,
		//	height
		//});
		return {
			width,
			height
		};
	}

	const handleChildClick = function(e) {
		e.stopPropagation();
	}

	return (
		<>
			{ props.visible &&
				<div
					className="overlay"
					style={{ width: `${windowDimensions.width}px`, height: `${windowDimensions.height}px` }}
					onClick={props.onHide}
					>
					<div onClick={handleChildClick}>
						{props.children}
					</div>
				</div>
			}
		</>
	);
}