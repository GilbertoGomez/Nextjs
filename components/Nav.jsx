import SideNav from '@/components/SideNav'

export default function Nav() {
	return (
		<>
			<nav className="bg-white border-b border-gray-100 z-10 fixed w-full shadow-md h-[45px]">
				<div className="flex items-center justify-between">
					<div className="ml-7"></div>
				</div>
			</nav>
			<SideNav />
		</>
	)
}
