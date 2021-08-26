import React from 'react';
import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const GenericContext = createContext();

export const GenericProvider = (props) => {

	const [items, setItems] = useState([]);
	const [tags, setTags] = useState([]);
	const [filterTag, setFilterTags] = useState(getInitialFilterTag());

	function getInitialFilterTag() {
		if (typeof (location) === "undefined" || location === null) {
			return null;
		}
		var query = window.location.search;
		var queryString = query.split('=');

		if (queryString[0] == '?tag') {
			return queryString[1];
		}
	}

	useEffect(() => {
		var dataTagUrl = props.dataUrl;

		fetch(dataTagUrl)
			.then(response => response.json())
			.then(json => {
				if (props.numberOfItems != null || parseInt(props.numberOfItems) > 0) {
					setItems(json.slice(0, (props.numberOfItems)));
				} else setItems(json);
				var tagsTemp = [];

				json.forEach(page => {
					if (page.settings.tags == null || page.settings.tags == "") {
						return;
					}
					var pageTags = page.settings.tags.split(",");

					pageTags.forEach(tag => {
						tag = tag.trim();

						if (!tagsTemp.includes(tag) && tag != props.adminFilter && tag != props.primaryTag) {
							tagsTemp.push(tag);
						}
					});
				});

				setTags(tagsTemp);
			})
			.catch((err) => console.debug(err))
	}, []);

	useEffect(() => {
		var dataUrl = props.dataUrl;
		var adminFilterTagValues = props.adminFilter;

		if (adminFilterTagValues != null && adminFilterTagValues != '') {
			dataUrl = props.dataUrl + '&tags=' + props.adminFilter;

		} 
		var pageUrl = window.location.pathname;
		if (filterTag != null && filterTag != 'All Categories') {
			dataUrl += '&tags=' + filterTag;
			pageUrl = pageUrl + '?tag=' + filterTag;
		}

		if (filterTag != null) {
			history.pushState(filterTag, '', pageUrl);
		}

		fetch(dataUrl)
			.then(response => response.json())
			.then(json => {
				if (props.numberOfItems != null || props.numberOfItems != 'undefined' || props.numberOfItems < 0) {
					setItems(json.slice(0, (props.numberOfItems)));
				} else setItems(json);
			})
			.catch((err) => console.debug(err))


	}, [filterTag, props.adminFilter]);

	useEffect(() => {
	}, [items]);

	return (
		<>
			{props.children(items, tags, setFilterTags)}
		</>

	);
}

GenericProvider.propTypes = {
	primaryTag: PropTypes.string.isRequired,
	tags: PropTypes.string
};