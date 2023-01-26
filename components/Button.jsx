export function Button({
	type = 'submit',
	className = '',
	processing,
	children,
	onClick,
	id,
	dataTooltipContent,
	dataTooltipPlace,
	dataId,
}) {
	return (
		<button
			data-tooltip-content={dataTooltipContent}
			data-tooltip-place={dataTooltipPlace}
			id={id}
			data-id={dataId}
			type={type}
			onClick={onClick}
			className={
				`'focus:outline-none font-semibold rounded-lg text-center inline-flex items-center' 
        ${processing && 'opacity-25'} ` + className
			}
			disabled={processing}
		>
			{children}
		</button>
	);
}
