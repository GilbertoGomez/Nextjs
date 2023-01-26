import Link from 'next/link'

export default function SideNav() {
	return (
		<>
			<aside
				className="w-48 h-full overflow-y-auto bg-orange-300 fixed mt-12 z-10"
				aria-label="Sidebar"
			>
				<ul className="border-b-2 border-stone-100 mb-20">
					<li className={'text-black'}>
						<Link href="/usuarios">
							<div className="flex items-center p-2 text-base font-semibold hover:bg-orange-700 hover:text-stone-100">
								<span>Usuarios</span>
							</div>
						</Link>
					</li>
					<li className={'text-black'}>
						<Link href="/productos">
							<div className="flex items-center p-2 text-base font-semibold  hover:bg-orange-700 hover:text-stone-100">
								<span>Productos</span>
							</div>
						</Link>
					</li>
				</ul>
			</aside>
		</>
	)
}
