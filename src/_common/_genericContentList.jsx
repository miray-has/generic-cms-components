import { useState } from 'react';
import { GenericProvider } from './_genericContext.jsx';
import TagNav from './_tagNav.jsx';
import PropTypes from 'prop-types';

export default function GenericContentList(props) {
	const [className, setClassName] = useState(listClass() || '');

	function listClass() {
		if (props.cssClass === 'teaser-link-cards') {
			return props.cssClass;
		} else {
			return props.containerid;
        }
    }

	return (
		<> 
			<GenericProvider
				dataUrl={props.dataUrl}
				adminFilter={props.options.adminFilter}
				primaryTag={props.primaryTag}
				showCaseValue={props.showCaseValue}
				numberOfItems={props.options.numberOfItems}
				data={props.data}>

				{(items, tags, onTagSelected, handleFilter) => {
					return (
						<div id={className}>
							<div className={className}>
								<section>
									{props.cssClass !== 'teaser-link-cards' &&
										<TagNav
											selectedTag={props.tag}
											tags={tags}
											onTagSelected={onTagSelected}
											showCaseValue={props.showCaseValue}
										/>
									}
									{
										props.children(items, handleFilter)
									}
								</section>
							</div>
						</div>
					);
				}
				}
			</GenericProvider>
		</>
	);
}

GenericContentList.propTypes = {
	selectedTag: PropTypes.string,
	tags: PropTypes.array,
	showCaseValue: PropTypes.string,
	data: PropTypes.array
}