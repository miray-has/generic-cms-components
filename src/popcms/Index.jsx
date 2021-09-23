import { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router-dom";

import AdminMenu from "./AdminMenu.jsx";
import AdminContentBlockMenu from './AdminContentBlockMenu.jsx';
import { msalInstance } from './Authentication.jsx';
import { loginRequest } from './../auth/authProvider.jsx';

import Layout from '../Layout.jsx';
import PageItem from '../uiElements/PageItem.jsx';
import { Helmet } from 'react-helmet';
import { GetServerUrl } from './ClientServerDataResolver.jsx';

export function isHostACmsHostName() {
	if (typeof (window) === "undefined" || window === null || window.location == null) {
		return false;
	}
	let host = window.location.host;
	return (host === "localhost:44320" ||
		host === "cms.eastpoint.co.uk"
		|| host === "eastpoint-2021.azurewebsites.net")
}

export async function GetUserAccessToken() {

	if (typeof (window) === "undefined" || window === null || window.location == null) {
		return false;
	}

	if (typeof (msalInstance) === "undefined" || msalInstance === null) {
		return false;
	}

	const accounts = msalInstance.getAllAccounts();

	if (accounts === null || accounts.length === 0) {
		return false;
	}

	const account = accounts[0];

	if (account == null) {
		return false;
	}

	const accessTokenRequest = {
		...loginRequest,
		account: account
	}

	var tokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);

	return tokenResponse.accessToken;

}

export async function isUserLoggedIn() {

	var accessToken = await GetUserAccessToken();

	if (accessToken)
		return true;
	else
		return false;
	
}

function PageItemList(props) {
	return (
		<section id="page-content">
			{props.items.map(x => <PageItem
				key={`page${props.url}-item${x.name}`}
				item={x}
				listsContent={props.listsContent}
				isAdmin={props.isAdmin}
				pageUrl={ props.url }
				handleElementChange={props.handleElementChange}
				settings={props.settings}
		/>)}
		</section>
	);
}

function AdminPageItem(props) {
	const [state, setState] = useState({optionsMenuOpen: false});

	const onOptionsButtonPress = function () {
		setState({ ...state, optionsMenuOpen: true });
	}

	const onOptionsChange = function (name, value) {
		props.onOptionsChange(name, value)
		setState({ ...state, optionsMenuOpen: false });
	}

	const onOptionsHide = function () {
		setState({ ...state, optionsMenuOpen: false });
	}

	return (
		<div className="popcms-element">
			<AdminContentBlockMenu
				index={props.index}
				onAddNew={props.addElementAtIndex}
				onDelete={props.removeElementAtIndex}
				onOpenOptions={onOptionsButtonPress}
				onMoveUp={props.moveUpElementAtIndex}
				onMoveDown={props.moveDownElementAtIndex} />
			<PageItem
				optionsMenuOpen={state.optionsMenuOpen}
				onOptionsChange={onOptionsChange}
				onOptionsHide={onOptionsHide}
				item={props.item}
				isAdmin={props.isAdmin}
				pageUrl={props.pageUrl}
				listsContent={props.listsContent}
				handleElementChange={props.handleElementChange}
				settings={props.settings} />
		</div>
	);
}

function AdminPageItemList(props) {
	useEffect(() => {

	}, [props.items]);
	return (
		<section id="page-content">
			{props.items.map((x, index) => (
				<AdminPageItem
					key={`page${props.url}-item${x.name}`}
					pageUrl={props.url}
					item={x}
					listsContent={props.listsContent}
					index={index}
					isAdmin={props.isAdmin}
					onOptionsChange={props.onOptionsChange}
					handleElementChange={props.handleElementChange}
					addElementAtIndex={props.addElementAtIndex}
					removeElementAtIndex={props.removeElementAtIndex}
					moveUpElementAtIndex={props.moveUpElementAtIndex}
					moveDownElementAtIndex={props.moveDownElementAtIndex}
					settings={props.settings}
				/>
			))}
		</section>
	);
}

export default function Admin(props) {
	const [isCms, setIsCms] = useState(false);
	const [isUserLoggedInToCms, setIsUserLoggedInToCms] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [id, setId] = useState(0);
	const [defaultElementValues, setDefaultElementValues] = useState({
		Banner: "<p>Adding new content</p><h1>Use the '+' symbols on the left-hand side to add new content blocks.</h1><p>Use page settings (top-right menu) to amend non-visible settings</p>",
		OneColumnContent: {
			col1: "<p></p>"
		},
		TwoColumnContent: {
			col1: "<p></p>",
			col2: "<p></p>"
		},
		ThreeColumnContent: {
			col1: "<p></p>",
			col2: "<p></p>",
			col3: "<p></p>"
		}
	});

	let location = useLocation()

	const [pageSettings, setPageSettings] = useState(props.page);

	useEffect(() => {
		if (props.page.content?.items == null || props.page.content.items.length === 0) {
			const extraData = {
				...props.page, content: {
					items: [
						newElementOfType("Banner")
					]
				}
			}
			setPageSettings(extraData);
		}
		else {
			setPageSettings(props.page);
		}

		isUserLoggedIn()
			.then(x => setIsUserLoggedInToCms(x));

	}, [props.page]);

	useEffect(() => {
		if (pageSettings.settings == null) {
			setPageSettings({
				...pageSettings, settings: {
					title: pageSettings.title || "",
					keywords: pageSettings.keywords || "",
					description: pageSettings.description || "",
					imageUrl: pageSettings.imageUrl || "",
					author: pageSettings.author || "",
					tags: pageSettings.tags || "",
					sortList: pageSettings.sortList || "1000",

				}
			});
		}

		if (pageSettings.settings != null && pageSettings.settings.sortList == null) {
			setPageSettings({
				...pageSettings,
				settings: {
					...pageSettings.settings,
					sortList: pageSettings.sortList || "1000",
				}
			});
		}
		
	}, [pageSettings]);

	function updateContentItems(newItems) {
		setPageSettings(
			{
				...pageSettings,
				content:
				{
					...pageSettings.content,
					items: newItems
				}
			});
	}

	function newElementOfType(type) {
		return {
			type: type,
			name: new Date().toISOString(),
			value: defaultElementValues[type]
		};
	}

	function addElementAtIndex(index, type) {		
		var newArray = insertIntoArrayAtIndex([...pageSettings.content.items], index, newElementOfType(type));
		updateContentItems(newArray);
	}

	function removeElementAtIndex(index) {
		var arr = [...pageSettings.content.items];
		arr.splice(index, 1);
		updateContentItems(arr);

		if (arr.length === 0) {
			addElementAtIndex(0, defaultElementValues["Banner"])
		}
	}

	function moveUpElementAtIndex(index) {
		var arr = moveUpInArrayAtIndex([...pageSettings.content.items], index);
		console.debug("Moved up");
		console.debug(arr);
		updateContentItems(arr);
	}

	function moveDownElementAtIndex(index) {
		var arr = moveDownInArrayAtIndex([...pageSettings.content.items], index);
		console.debug("Moved down");
		console.debug(arr);
		updateContentItems(arr);
	}

	function removeFromArrayAtIndex(arr, index) {
		arr.splice(index, 1);
		return arr;
	}

	function insertIntoArrayAtIndex(arr, index, element) {
		arr.splice(index, 0, element);
		return arr;
	}

	function moveUpInArrayAtIndex(arr, index) {
		if (index <= 0) return arr;
		var elementToMove = arr[index];
		var arrItemRemoved = removeFromArrayAtIndex(arr, index);
		return insertIntoArrayAtIndex(arrItemRemoved, index - 1, elementToMove);
	}

	function moveDownInArrayAtIndex(arr, index) {
		if (index >= arr.length - 1) return arr;
		var elementToMove = arr[index];
		var arrItemRemoved = removeFromArrayAtIndex(arr, index);
		return insertIntoArrayAtIndex(arrItemRemoved, index + 1, elementToMove);
	}

	function setPropertyForElement(elementName, propertyName, value) {
		var elementIndex = pageSettings.content.items.findIndex(x => x.name === elementName);
		var element = { ...pageSettings.content.items[elementIndex] };
		element = { ...element, [propertyName]: value };
		var contentArray = [...pageSettings.content.items];
		contentArray[elementIndex] = element;
		updateContentItems(contentArray);
	}

	function onOptionsChange(elementName, options) {
		console.debug("got setting for " + elementName + " " + options);
		setPropertyForElement(elementName, "options", options)
	}

	function handleElementChange(elementName, value) {
		setPropertyForElement(elementName, "value", value)
	}

	function uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	
	async function onSave(_pageSettings, successCallback) {

		if (isSaving) {
			return;
		}

		setIsSaving(true);

		var accessToken = await GetUserAccessToken();

		var bearer = "Bearer " + accessToken;
		fetch(GetServerUrl() + "/api/save/", {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
				'Authorization': bearer
			},
			body: JSON.stringify(_pageSettings),
		})
			.then(() => {
				console.debug('Success uploading');
				setIsSaving(false);
				if (successCallback != null) {
					successCallback();
				}
			})
			.catch((error) => {
				setPageSettings({ error });
				console.error('Error:', error);
				setIsSaving(false);
			});
	}

	function handleSave() {

		var _pageSettings =
		{
			...pageSettings,
			templateName: "Home",
			redirectUrl: "",
			pageUrl: window.location.pathname,
			userId: uuidv4(), // todo: get user id from id token
			id: uuidv4(),
			updatedDateTime: new Date(),
			content: { ...pageSettings.content, items: JSON.stringify(pageSettings.content.items) }
		};
		onSave(_pageSettings);
	}

	function onSettingsChange(newSettings) {
		setPageSettings({ ...pageSettings, settings: newSettings });
	}

	if (typeof(window) !== "undefined") {
		useEffect(() => {
			setTimeout(() => {
				
					let host = window.location.host;
				if (host === "localhost:44320" ||
					window.location.host === "cms.eastpoint.co.uk"
						|| window.location.host === "eastpoint-2021.azurewebsites.net")
					{
						//setIsCms(true)
					}
					else
					{
						console.log(`Runnng on ${host}`);
					}
				
			}, 100)
		}, []);
	}

	function onLogoutPressed() {
		msalInstance.logout();
		setIsCms(false);
	}

	return (
		<Layout pageCssClass={pageSettings.settings?.pageCssClass}>
			<>
				{ (typeof (window) !== "undefined") && pageSettings.settings &&
					<Helmet>
						<title>{pageSettings.settings.title}</title>
						<meta name="description" content={pageSettings.settings.description} />
						<meta name="keywords" content={pageSettings.settings.keywords} />
						<meta name="author" content={pageSettings.settings.author} />
						<meta name="image" property="og:image" content={pageSettings.settings.imageUrl} />
						<link rel="alternate" hreflang="en" href={ `https://www.eastpoint.co.uk${pageSettings.pageUrl}` } />
						<link rel="canonical" href={`https://www.eastpoint.co.uk${pageSettings.pageUrl}`} />
					</Helmet>
				}
			{
				(!isCms || !isUserLoggedInToCms) && pageSettings.content.items &&
					<PageItemList
						url={pageSettings.pageUrl}
						items={pageSettings.content.items}
						listsContent={pageSettings.listsContent}
						isAdmin={false}
						settings={pageSettings}
					/>
				}
				{
					isCms && pageSettings.content.items &&
					<>
						{isUserLoggedInToCms &&
							<AdminPageItemList
							settings={pageSettings}
							url={pageSettings.pageUrl}
							items={pageSettings.content.items}
							isAdmin={true}
							handleElementChange={handleElementChange}
							onOptionsChange={onOptionsChange}
							addElementAtIndex={addElementAtIndex}
							removeElementAtIndex={removeElementAtIndex}
							moveUpElementAtIndex={moveUpElementAtIndex}
							moveDownElementAtIndex={moveDownElementAtIndex}
							listsContent={pageSettings.listsContent}
							/>
						}
						<AdminMenu
							settings={pageSettings}
							onSettingsChange={onSettingsChange}
							onLogoutPressed={ onLogoutPressed }
							onSaveCurrentPage={handleSave}
							onSaveNewPage={onSave}
							isSaving={isSaving} />
					</>
				}
			</>
		</Layout>
	);


}