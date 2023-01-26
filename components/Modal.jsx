export default function Modal({
	children,
	show,
	maxWidth = '2xl',
	closeable = true,
	onClose = () => {},
}) {
	if (!show) {
		return null
	}

	const close = () => {
		if (closeable) {
			onClose()
		}
	}

	const maxWidthClass = {
		sm: 'sm:max-w-sm',
		md: 'sm:max-w-md',
		lg: 'sm:max-w-lg',
		xl: 'sm:max-w-xl',
		'2xl': 'sm:max-w-2xl',
	}[maxWidth]

	return (
		<>
			<div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50">
				<div>
					<div
						className="fixed inset-0 transform transition-all"
						onClick={close}
					>
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
				</div>

				<div>
					<div
						className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
					>
						{children}
					</div>
				</div>
			</div>
		</>
	)
}
