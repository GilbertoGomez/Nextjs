import UserNewForm from '@/components/UserNewForm'

export default function Home() {
	return (
		<>
			<div className="ml-48 relative overflow-hidden">
				<div className="relative w-11/12 pb-16 mx-auto mt-0 pt-16">
					<UserNewForm className="w-full" />
				</div>
			</div>
		</>
	)
}
