import TagLink from './_tagLink.jsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function TagNav(props) {
	const [showCaseTag, setShowCaseTag] = useState(['All Categories']);
	const [tempTag, setTempTag] = useState(['All Categories']);
	const [filterTag, setFilterTag] = useState(['All Categories']);

	let showAllClassName = "active"
	if (typeof (props.selectedTag) !== "undefined" && props.selectedTag !== null && props.selectedTag !== "") {
		showAllClassName = ""
	}

	useEffect(() => {
		setFilterTag(tempTag);
		setShowCaseTag(filterTag);

		return function cleanup() {
			setTempTag('');
		};
	},
		[tempTag]
	);


	function onTagSelectedAll() {
		props.onTagSelected('All Categories');
		setShowCaseTag('All Categories');

	}

	return (
		<>
			{props.cssClass !== 'teaser-link-cards' &&

				<nav id="tag-nav">
					<ul>

						{
							(props.tags.length > 0) &&
							<>
								<li><button onClick={onTagSelectedAll} className={showAllClassName}>All Categories</button></li>
							</>
						}

						{
							props.tags != null && props.tags.map(tag => {
								let className = ""
								if (props.selectedTag === tag) {
									className = "active"
								}
								return <TagLink onTagSelected={props.onTagSelected} tagClicked={tempTag => setTempTag(tempTag)} key={tag} tag={tag} className={className} />
							})
						}
					</ul>
				</nav>
			}

			{
				props.cssClass !== 'teaser-link-cards' && props.showCaseValue &&
				<>
					<div id="filterShowCase">{props.showCaseValue} | {showCaseTag}</div> 
				</>
			}

			{
				props.cssClass === 'teaser-link-cards' && props.showCaseValue &&
				<>
					<div id="filterShowCase">
						<div>{props.showCaseValue}</div>
						<div><u>{props.seeAllLink}</u></div>
					</div>
				</>
			}

		</>
	);

}

TagNav.propTypes = {
	onTagSelected: PropTypes.func,
	selectedTag: PropTypes.string,
	tags: PropTypes.array,
	showCaseValue: PropTypes.string,
	cssClass: PropTypes.string,
	seeAllLink: PropTypes.func
};