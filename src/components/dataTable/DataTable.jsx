import "./dataTable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { userColumns, userRows } from "../../dataTableSource"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function DataTable() {
	const actionColumn = {
		field: "action",
		headerName: "Action",
		width: 200,
		renderCell: () => {
			return (
				<div className="cell-action">
					<div className="view-button">View</div>
					<div className="delete-button">Delete</div>
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
				rows={userRows}
				columns={userColumns.concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	)
}
