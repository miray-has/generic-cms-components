import { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import TextInput from '../_common/TextInput.js';
import Overlay from '../_common/_overlay.jsx';
import Image from '../_common/_image.jsx';


export default function FaqComponent(props) {

	const [state, setState] = useState({
		question1: "I want to provide my solution to everyone in my industry and maximise ROI with subscriptions.",
		logo1: "/img/icon/faq-icons/sass-icon.svg",
		title1: "SaaS Development",
		subtext1: "Turn your solution into a multi-tenanted cloud application for multiple business. Our building blocks enable software-as-a-service businesses to launch faster.",
		url1: "/saas-development",

		question2: "Beautiful software applications that users love and that drive growth for our company, please.",
		logo2: "/img/icon/faq-icons/web-mobile-icon.svg",
		title2: "Web and mobile software",
		subtext2: "Bring your web or smartphone application to life with an engaging user experience and clearly defined customer value.",
		url2: "/web-and-mobile-software",

		question3: "I need to digitise, transform and lead, in collaboration with a trusted digital expert.",
		logo3: "/img/icon/faq-icons/consultancy-icon.svg",
		title3: "Digital product consultancy",
		subtext3: "Strategic thinking to deliver successful digital platforms and software applications.",
		url3: "/digital-product-consulting",

		question4: "We're doing something totally different.",
		logo4: "/img/icon/faq-icons/emerging-technologies-icon.svg",
		title4: "Emerging technologies",
		subtext4: "Our portfolio includes pioneering IoT apps and XR experiences for connected devices, smart products and cooperative intelligent transport systems (C-ITS).",
		url4: "/emerging-technologies"
	});


	return (
		<div>
			<div id="faq-component">
				<div className="faq-component-item">
					<FaqComponentItem
						question={state.question1}
						logo={state.logo1}
						title={state.title1}
						subtext={state.subtext1}
						url={state.url1}
					/>
					<FaqComponentItem
						question={state.question2}
						logo={state.logo2}
						title={state.title2}
						subtext={state.subtext2}
						url={state.url2}
					/>
				</div>
			</div>

			<div id="faq-component">
				<div className="faq-component-item">
					<FaqComponentItem
						question={state.question3}
						logo={state.logo3}
						title={state.title3}
						subtext={state.subtext3}
						url={state.url3}
					/>
					<FaqComponentItem
						question={state.question4}
						logo={state.logo4}
						title={state.title4}
						subtext={state.subtext4}
						url={state.url4}
					/>
				</div>
			</div>

			<Options isVisible={props.optionsMenuOpen} options={props.options} onOptionsChange={props.onOptionsChange} onOptionsHide={props.onOptionsHide} />
		</div>

	);
}

function FaqComponentItem(props) {

	return (
		<div>
			<div>
				<p>{props.question}</p>
			</div>
			<div>
				<div>
					<div className="logo">
						<Image
							src={props.logo}
							alt={props.title}
						/>
					</div>
					<div className="logo-info">
						<h4>{props.title}</h4>
						<p>{props.subtext}</p>
						<div><p><Link to={props.url}>Learn more</Link></p></div>
					</div>
				</div>
			</div>
		</div>
	)
}



function Options(props) {
	const [state, setState] = useState(props.options || { layout: null });

	useEffect(() => {
		console.debug("Options", props.isVisible);
	}, [props.isVisible])

	function onChange({ target }) {
		var newState = { ...state, [target.name]: target.value };
		setState(newState);
	}

	const handleSubmit = function (event) {
		console.debug("handleSubmit", state);
		props.onOptionsChange(state);
		event.preventDefault();
	}

	return (
		<Overlay visible={props.isVisible} onHide={props.onHide}>
			<form onSubmit={handleSubmit} method="post">
				<h2>Banner options</h2>
				<TextInput
					label="CSS class"
					name="cssClass"
					value={state.cssClass}
					onChange={onChange}
				/>
				<button onClick={props.onHide} className="btn btn-danger">Cancel</button>
				<input type="submit" className="btn btn-primary" value="Continue" />
			</form>
		</Overlay>
	)
}