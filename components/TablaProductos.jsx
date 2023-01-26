import React, { useState, Fragment } from 'react'
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import Modal from '@/components/Modal'
import { Button } from '@/components/Button'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function TablaProductos({ productos }) {
	const [idCategoria, setIdCategoria] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
	const [isOpenEdit, setIsOpenEdit] = useState(false)
	const router = useRouter()

	const closeModalDelete = () => {
		setIsOpen(false)
	}

	const openModalDelete = (e) => {
		setIsOpen(true)
		setIdCategoria(e.currentTarget.getAttribute('data-id'))
	}

	const DeleteResource = async (e) => {
		e.target.setAttribute('disabled', true)
		e.target.classList.add('disabled:opacity-60', 'cursor-not-allowed')

		setIsOpen(false)

		const URL = `http://127.0.0.1:8000/items/${idCategoria}`
		const response = await fetch(URL, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		})
		const mensaje = await response.json()
		if (response.status < 300) {
			router.replace('/')
			alert(mensaje)
		}
	}

	const EditResource = async (e) => {
		e.preventDefault()
		e.target.setAttribute('disabled', true)
		e.target.classList.add('disabled:opacity-60', 'cursor-not-allowed')

		setIsOpenEdit(false)

		const data = {
			id: idCategoria,
			CategoriesName: e.target.categoria.value,
			ProductsName: e.target.producto.value,
		}

		const JSONdata = JSON.stringify(data)
		const URL = `http://127.0.0.1:8000/items`
		const response = await fetch(URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSONdata,
			cache: 'default',
		})
		const mensaje = await response.json()
		if (response.status < 300) {
			router.replace('/')
			alert(mensaje)
		}
	}

	const closeModalEdit = () => {
		setIsOpenEdit(false)
	}

	const openModalEdit = (e) => {
		setIsOpenEdit(true)
		setIdCategoria(e.currentTarget.getAttribute('data-id'))
	}

	const demo = ['N°', 'Producto', 'Categoria']
	const columnHelper = createColumnHelper()
	const columns = [
		columnHelper.accessor('id', {
			header: () => 'N°',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('ProductsName', {
			header: () => 'Producto',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('CategoriesName', {
			header: () => 'Categoria',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('actions', {
			header: () => '',
			cell: ({ row }) => (
				<Fragment>
					<div className="flex gap-3">
						<Button
							dataTooltipContent="Eliminar"
							dataTooltipPlace="top"
							type="button"
							onClick={openModalDelete}
							dataId={row.original.id}
							id={row.id + '-Delete'}
							className="text-white bg-red-600 hover:bg-red-900 p-2"
						>
							<span className="sr-only">Icon delete</span>
							<TrashIcon className="w-4 h-4" />
						</Button>

						<Tooltip anchorId={row.id + '-Delete'} />

						<Button
							dataTooltipContent="Modificar"
							dataTooltipPlace="top"
							type="button"
							onClick={openModalEdit}
							dataId={row.original.id}
							id={row.id + '-Edit'}
							className="text-white bg-blue-500 hover:bg-blue-900 p-2"
						>
							<span className="sr-only">Icon Edit</span>
							<PencilSquareIcon className="w-4 h-4" />
						</Button>
						<Tooltip anchorId={row.id + '-Edit'} />
					</div>
				</Fragment>
			),
		}),
	]
	const [data] = React.useState(() => [...productos])
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<>
			<div className="overflow-x-auto px-4 pb-14 ">
				<div className="flex w-full">
					<Link
						href="/productos/nuevo"
						className="text-white bg-emerald-900 hover:bg-emerald-700 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
					>
						<p>Crear Categoria</p>
					</Link>
				</div>

				<table className="w-full table-auto text-left mt-1 shadow-[#8a8989ef] shadow-lg">
					<thead className="text-xs text-white uppercase bg-zinc-700">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id} scope="col" className="py-3 px-6">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="text-sm font-medium even:border-0 border-b border-zinc-300 hover:bg-zinc-500 hover:text-white text-black even:bg-gray-100 odd:bg-gray-200"
							>
								{row.getVisibleCells().map((cell, index) => (
									<td
										key={cell.id}
										className="py-4 px-6"
										data-label={demo[index]}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Modal
				show={isOpen}
				closeable={true}
				onClose={closeModalDelete}
				maxWidth="sm"
			>
				<div className="relative bg-white rounded-lg shadow ">
					<div className="p-4 text-center">
						<h3 className="mb-5 text-xl font-normal">
							¿Quieres eliminar este producto?
						</h3>
						<div className="flex justify-end">
							<button
								data-modal-toggle="popup-modal"
								type="button"
								onClick={closeModalDelete}
								className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-400 text-sm font-medium px-5 py-2 hover:text-gray-900 mr-3"
							>
								Cancelar
							</button>
							<button
								data-modal-toggle="popup-modal"
								type="button"
								onClick={DeleteResource}
								className="text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2 text-center"
							>
								Aceptar
							</button>
						</div>
					</div>
				</div>
			</Modal>

			<Modal
				show={isOpenEdit}
				closeable={true}
				onClose={closeModalEdit}
				maxWidth="xl"
			>
				<div className="relative bg-white rounded-lg shadow ">
					<div className="p-4 text-center">
						<h3 className="mb-5 text-xl font-normal">Modificar Producto</h3>

						<form onSubmit={EditResource}>
							<div className="relative z-0 mb-6 w-full group">
								<input
									type="text"
									name="producto"
									id="producto"
									className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-orange-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									autoComplete="off"
								/>
								<label
									htmlFor="producto"
									className="left-0 peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									producto
								</label>
							</div>

							<div className="relative z-0 mb-6 w-full group">
								<input
									type="text"
									name="categoria"
									id="categoria"
									className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-orange-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									autoComplete="off"
								/>
								<label
									htmlFor="categoria"
									className="left-0 peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
								>
									categoria
								</label>
							</div>

							<div className="flex justify-end">
								<button
									data-modal-toggle="popup-modal"
									type="button"
									onClick={closeModalEdit}
									className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-400 text-sm font-medium px-5 py-2 hover:text-gray-900 mr-3"
								>
									Cancelar
								</button>
								<button
									data-modal-toggle="popup-modal"
									className="text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2 text-center"
								>
									Guardar
								</button>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</>
	)
}
