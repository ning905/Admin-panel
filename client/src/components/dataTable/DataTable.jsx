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
	const { currentUser } = useContext(AuthContext)
	const location = useLocation()
	console.log("location: ", location)
	console.log("currentUser: ", currentUser)

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
					console.log("response data: ", res.data.data)
					setData(res.data.data)
				})
				.catch((err) => console.error(err))
		}
	}, [])

	console.log("data", data)
	async function handleDelete(id) {}

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

					<div className="delete-button" onClick={() => handleDelete(params.row.id)}>
						Delete
					</div>
				</div>
			)
		},
	}

	console.log("columns: ", userColumns)
	return (
		<div className="data-table">
			<div className="data-table-title">
				{location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2, -1)}{" "}
				list
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
