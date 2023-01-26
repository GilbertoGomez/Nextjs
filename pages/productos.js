import { TablaProductos } from '@/components/TablaProductos'

export default function Usuarios({ productos }) {
	return (
		<>
			<div className="ml-48 relative overflow-hidden">
				<div className="relative w-11/12 pb-16 mx-auto mt-0 pt-16">
					<TablaProductos productos={productos} />
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	const response = await fetch('http://127.0.0.1:8000/items')
	const productos = await response.json()
	return {
		props: {
			productos,
		},
	}
}
