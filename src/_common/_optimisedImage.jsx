function OptimisedImage(props){

return (
	<img srcSet={`${props.uri},
		${props.uri.replace('/1x/', '/1.5x/')} 1.5x,
		${props.uri.replace('/1x/', '/2x/')} 2x,
		${props.uri.replace('/1x/','/2x/')} 3x`}
		src={props.uri.replace('/1x/', '/2x/')}
		alt={props.description}
		className="image-preview"
		width={`${props.width}`}
		height={`${props.height}`} />
);

}

export default OptimisedImage;