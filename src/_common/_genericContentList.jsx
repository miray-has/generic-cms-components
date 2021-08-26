import { useEffect, useState } from 'react';
import { GenericProvider } from './_genericContext.jsx';
import TagNav from './_tagNav.jsx';
import PropTypes from 'prop-types';


export default function GenericContentList(props) {
	return (
		<> 
			<GenericProvider
				dataUrl={props.dataUrl}
				adminFilter={props.options.adminFilter}
				primaryTag={props.primaryTag}
				showCaseValue={props.showCaseValue}
				numberOfItems={props.options.numberOfItems}>

				{(items, tags, onTagSelected, handleFilter) => {
					return (
						<section id={props.containerid}>
							<div>
								<section>
									<TagNav
										selectedTag={props.tag}
										tags={tags}
										onTagSelected={onTagSelected} 
										showCaseValue={props.showCaseValue}
									/>
									{
										props.children(items, handleFilter)
									}
								</section>
							</div>
						</section>
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
	showCaseValue: PropTypes.string

}