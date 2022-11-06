import "./transactionTable.scss"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useEffect, useState } from "react"
import client from "../../utils/client"
import { format } from "date-fns"

export default function TransactionTable({ target, type }) {
	const [rows, setRows] = useState([])

	useEffect(() => {
		let query = ""
		if (target) {
			query = `?${type}=${target.id}`
		}
		const endpoint = "/transactions" + query

		client
			.get(endpoint)
			.then((res) => setRows(res.data.data))
			.catch((err) => console.error(err))
	}, [target, type])

	function formatTime(timeStr) {
		const formatted = format(new Date(timeStr), "dd-MMM-yyyy")
		let arr = formatted.split("-")

		if (Number(arr[2]) === new Date().getFullYear()) {
			arr.splice(2, 1)
		}
		return arr.join(" ")
	}

	if (rows.length > 0) {
		formatTime(rows[0].createdAt)
	}

	return (
		<>
			{rows.length ? (
				<TableContainer component={Paper} className="table">
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className="table-cell">Tracking ID</TableCell>
								<TableCell className="table-cell">Product</TableCell>
								<TableCell className="table-cell">Customer</TableCell>
								<TableCell className="table-cell">Date</TableCell>
								<TableCell className="table-cell">Amount</TableCell>
								<TableCell className="table-cell">Payment Method</TableCell>
								<TableCell className="table-cell">Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id}>
									<TableCell className="table-cell">{row.id}</TableCell>
									<TableCell className="table-cell">
										<div className="cell-wrapper">
											<img src={row.product.imgUrl} alt="product" className="image" />
											{row.product.title}
										</div>
									</TableCell>
									<TableCell className="table-cell">{row.customer}</TableCell>
									<TableCell className="table-cell">
										{formatTime(row.createdAt)}
									</TableCell>
									<TableCell className="table-cell">{row.amount}</TableCell>
									<TableCell className="table-cell">
										{row.paymentMethod.split("_").join(" ")}
									</TableCell>
									<TableCell className="table-cell">
										<span className={`status ${row.status}`}>{row.status}</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<p className="no-transaction">No transactions yet.</p>
			)}
		</>
	)
}
