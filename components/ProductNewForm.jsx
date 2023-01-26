import { Button } from '@/components/Button'

export default function UserNewForm() {
	const submit = async (e) => {
		e.preventDefault()
		const data = {
			CategoriesName: e.target.categoria.value,
			ProductsName: e.target.producto.value,
		}
		const JSONdata = JSON.stringify(data)
		const URL = `http://127.0.0.1:8000/items`
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
			cache: 'default',
		})
		const mensaje = await response.json()
		if (response.status < 300) {
			document.getElementById('newproductsForm').reset()
			alert(mensaje)
		}
	}

	return (
		<main className="px-5">
			<h1 className="font-bold text-xl text-center my-3">
				Registro de nuevo Producto
			</h1>
			<div className=" border-2 border-orange-400 px-5 pt-1 rounded-md shadow-xl">
				<form id="newproductsForm" onSubmit={submit} autoComplete="off">
					<div className="mt-4">
						<input
							type="text"
							id="producto"
							name="producto"
							className="p-1 border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm mt-1 block w-full font-semibold text-black"
							placeholder="producto"
							required
						/>
						<input
							type="text"
							id="categoria"
							name="categoria"
							className="p-1 border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm mt-1 block w-full font-semibold text-black"
							placeholder="Categoria"
							required
						/>
					</div>

					<div className="flex items-center justify-end mt-4">
						<Button className="text-white bg-emerald-900 hover:bg-emerald-700 mb-4 flex items-center gap-1 py-2 px-3">
							Guardar
						</Button>
					</div>
				</form>
			</div>
		</main>
	)
}
