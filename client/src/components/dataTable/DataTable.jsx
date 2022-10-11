import "./dataTable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { userColumns } from "../../utils/dataTableSource.js"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function DataTable() {
	const [data, setData] = useState([])

	useEffect(() => {}, [])

	async function handleDelete(id) {}

	const actionColumn = {
		field: "action",
		headerName: "Action",
		width: 200,
		renderCell: (params) => {
			return (
				<div className="cell-action">
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

	return (
		<div className="data-table">
			<div className="data-table-title">
				Add New User
				<Link to="/users/new" className="link">
					Add New
				</Link>
			</div>
			<DataGrid
				className="data-grid"
				rows={data}
				columns={userColumns.concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	)
}
