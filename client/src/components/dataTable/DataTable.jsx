import "./dataTable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { productColumns, userColumns } from "../../utils/dataTableSource.js"
import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import client from "../../utils/client"
import { AuthContext } from "../../context/AuthContext"

export default function DataTable() {
	const [data, setData] = useState([])
	const [columns, setColumns] = useState([])
	const [error, setError] = useState("")

	const { currentUser } = useContext(AuthContext)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/products") {
			setColumns(productColumns)
		} else if (location.pathname === "/users") {
			setColumns(userColumns)
		}

		if (
			location.pathname === "/products" ||
			(location.pathname === "/users" && currentUser.role === "ADMIN")
		) {
			client
				.get(location.pathname)
				.then((res) => {
					setData(res.data.data.map((row) => ({ ...row, deleteAction: false })))
				})
				.catch((err) => {
					console.error(err)
				})
		}
	}, [currentUser.role, location.pathname])

	function handleConfirm(row) {
		row.deleteAction = true
	}

	async function handleDelete(id) {
		client
			.delete(`${location.pathname}/${id}`)
			.then((res) => {
				if (res.data.status === "success") {
					setData((data) => data.filter((d) => d.id !== id))
				}
			})
			.catch((err) => {
				setError(`Error: ${err.response.data.message}`)
				setTimeout(() => {
					setError("")
				}, "3000")
			})
	}

	const actionColumn = {
		field: "action",
		headerName: "Action",
		width: 200,
		headerAlign: "center",
		align: "center",
		renderCell: (params) => {
			return (
				<div className="data-cell cell-action">
					<Link to="/users/test" style={{ textDecoration: "none" }}>
						<div className="view-button">View</div>
					</Link>

					{!params.row.deleteAction && (
						<div className="delete-button" onClick={() => handleConfirm(params.row)}>
							Delete
						</div>
					)}

					{params.row.deleteAction && (
						<div
							className="delete-button confirm"
							onClick={() => handleDelete(params.row.id)}
						>
							Confirm
						</div>
					)}
				</div>
			)
		},
	}

	return (
		<div className="data-table">
			<div className="data-table-title">
				{location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2, -1)}{" "}
				list
				{error && <span>{error}</span>}
				<Link to={`${location.pathname}/new`} className="link">
					Add New
				</Link>
			</div>
			<DataGrid
				className="data-grid"
				rows={data}
				getRowId={(row) => row.id}
				columns={columns.concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	)
}
