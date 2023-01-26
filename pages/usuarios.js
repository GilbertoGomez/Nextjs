import { TablaUsuarios } from '@/components/TablaUsuarios'

export default function Usuarios({ usuarios }) {
	return (
		<>
			<div className="ml-48 relative overflow-hidden">
				<div className="relative w-11/12 pb-16 mx-auto mt-0 pt-16">
					<TablaUsuarios users={usuarios} />
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	const response = await fetch('http://127.0.0.1:8000/usuarios')
	const usuarios = await response.json()
	return {
		props: {
			usuarios,
		},
	}
}
