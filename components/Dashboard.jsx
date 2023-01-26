export default function Dashboard({ children }) {
	return (
		<>
			<div className="ml-48 relative overflow-hidden">
				<div className="relative pb-16 mx-auto mt-0 pt-16">{children}</div>
			</div>
		</>
	)
}
