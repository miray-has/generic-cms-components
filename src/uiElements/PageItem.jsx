import { useEffect } from 'react';
import Banner from "../uiElements/_banner.jsx";
import OneColumnContent from "../uiElements/_oneColumnContent.jsx";
import TwoColumnContent from "../uiElements/_twoColumnContent.jsx";
import ThreeColumnContent from "../uiElements/_threeColumnContent.jsx";
import OneColumnAndOneImage from './_oneColumnAndOneImage.jsx';
import TwoColumnImageWithText from './_twoColumnImageWithText.jsx';
import OneColumnWideImage from './_oneColumnWideImage.jsx';
import ThreeColumnImage from "../uiElements/_threeColumnImage.jsx";
import Button from './_button.jsx';
import FaqComponent from './_faqComponent.jsx';

export const PageItemOptions = [
	{ typeName: "Banner" },
	{ typeName: "OneColumnContent" },
	{ typeName: "TwoColumnContent" },
	{ typeName: "ThreeColumnContent" },
	{ typeName: "OneColumnAndOneImage", prettyName: "Column and image" },
	{ typeName: "TwoColumnImageWithText", prettyName: "Two column image with text" },
	{ typeName: "OneWideImage", prettyName: "One wide image" },
	{ typeName: "ThreeColumnImage", prettyName: "Three column image" },
	{ typeName: "Button" },
	{ typeName: "FaqComponent", prettyName: "FAQ component" },
];

export default function PageItem(props) {

	useEffect(() => {
		console.debug("loadPageItem", props.item.name, props.optionsMenuOpen);
	}, [props.item.name, props.optionsMenuOpen]);

	const onOptionsChange = function (newOptions) {
		console.debug("PageItem.onOptionsChange", props.item.name, newOptions);
		props.onOptionsChange(props.item.name, newOptions);
	}

	switch (props.item.type) {
		case "Banner": {
			return (
				<React.Fragment>
					<Banner
						onChange={props.handleElementChange}
						optionsMenuOpen={props.optionsMenuOpen}
						options={props.item.options || {}}
						onOptionsChange={onOptionsChange}
						onOptionsHide={props.onOptionsHide}
						name={props.item.name}
						value={props.item.value}
						isAdmin={props.isAdmin}
					/>
				</React.Fragment>
			);
			break;
		}
		case "OneColumnContent": {
			return (
				<OneColumnContent
					onChange={props.handleElementChange}
					optionsMenuOpen={props.optionsMenuOpen}
					options={props.item.options || {}}
					onOptionsChange={onOptionsChange}
					onOptionsHide={props.onOptionsHide}
					name={props.item.name}
					value={props.item.value}
					isAdmin={props.isAdmin}
				/>
			);
			break;
		}
		case "TwoColumnContent": {
			return (
				<TwoColumnContent
					onChange={props.handleElementChange}
					optionsMenuOpen={props.optionsMenuOpen}
					options={props.item.options || {}}
					onOptionsChange={onOptionsChange}
					onOptionsHide={props.onOptionsHide}
					name={props.item.name}
					value={props.item.value}
					isAdmin={props.isAdmin}
				/>
			);
			break;
		}
		case "ThreeColumnContent": {
			return (
				<ThreeColumnContent
					onChange={props.handleElementChange}
					optionsMenuOpen={props.optionsMenuOpen}
					options={props.item.options || {}}
					onOptionsChange={onOptionsChange}
					onOptionsHide={props.onOptionsHide}
					name={props.item.name}
					value={props.item.value}
					isAdmin={props.isAdmin}
				/>
			);
			break;
		}
		case "OneColumnAndOneImage": {
			return (
				<OneColumnAndOneImage
					onChange={props.handleElementChange}
					optionsMenuOpen={props.optionsMenuOpen}
					options={props.item.options || {}}
					onOptionsChange={onOptionsChange}
					onOptionsHide={props.onOptionsHide}
					name={props.item.name}
					value={props.item.value || {}}
					isAdmin={props.isAdmin}
				/>
			);
			break;
		}
		case "TwoColumnImageWithText": {
			return (
				<TwoColumnImageWithText
					onChange={props.handleElementChange}
					optionsMenuOpen={props.optionsMenuOpen}
					options={props.item.options || {}}
					onOptionsChange={onOptionsChange}
					onOptionsHide={props.onOptionsHide}
					name={props.item.name}
					value={props.item.value || {}}
					isAdmin={props.isAdmin}
				/>
			);
			break;
		}
		case "OneColumnWideImage": {
			return (
				<OneColumnWideImage
					onChange={props.handleElementChange}
					optionsMenuOpen={props.optionsMenuOpen}
					options={props.item.options || {}}
					onOptionsChange={onOptionsChange}
					onOptionsHide={props.onOptionsHide}
					name={props.item.name}
					value={props.item.value || {}}
					isAdmin={props.isAdmin}
				/>
			);
			break;
		}
		case "ThreeColumnImage": {
			return (
				<ThreeColumnImage
					onChange={props.handleElementChange}
					optionsMenuOpen={props.optionsMenuOpen}
					options={props.item.options || {}}
					onOptionsChange={onOptionsChange}
					onOptionsHide={props.onOptionsHide}
					name={props.item.name}
					value={props.item.value || {}}
					isAdmin={props.isAdmin}
				/>
			);
			break;
		}
		case "Button": {
			return (
				<React.Fragment>
					<Button
						onChange={props.handleElementChange}
						optionsMenuOpen={props.optionsMenuOpen}
						options={props.item.options || {}}
						onOptionsChange={onOptionsChange}
						onOptionsHide={props.onOptionsHide}
						name={props.item.name}
						value={props.item.value}
						isAdmin={props.isAdmin}
						pageUrl={props.pageUrl}					/>
				</React.Fragment>
			);
			break;
		}
		case "FaqComponent": {
			return (
				<React.Fragment>
					<FaqComponent
						onChange={props.handleElementChange}
						optionsMenuOpen={props.optionsMenuOpen}
						options={props.item.options || {}}
						onOptionsChange={onOptionsChange}
						onOptionsHide={props.onOptionsHide}
						name={props.item.name}
						value={props.item.value}
						isAdmin={props.isAdmin}
						pageUrl={props.pageUrl}
					/>
				</React.Fragment>
			);
			break;
		}
		default: {
			return <p>Unknown type: {props.item.type}</p>
		}
	}

	return (
		<div>{showElementItself()}</div>
	);
}