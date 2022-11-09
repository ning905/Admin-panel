import { useContext, useEffect, useState } from "react"
import Chart from "../../components/chart/Chart.jsx"
import Featured from "../../components/featured/Featured.jsx"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import TransactionTable from "../../components/transactionTable/TransactionTable.jsx"
import Widget from "../../components/widget/Widget.jsx"
import { AuthContext } from "../../context/AuthContext.js"
import client from "../../utils/client.js"
import {
	getDataDiff,
	getLastPeriodItems,
	getProductRevenueData,
	getRevenue,
	getThisPeriodItems,
} from "../../utils/getChartData.js"
import "./home.scss"

export default function Home() {
	const [transactionRows, setTransactionRows] = useState([])
	const [users, setUsers] = useState([])
	const [products, setProducts] = useState([])
	const { currentUser } = useContext(AuthContext)

	useEffect(() => {
		let query = ""
		if (currentUser.role !== "ADMIN") {
			query = `?sellerId=${currentUser.id}`
		}
		const endpoint = "/transactions" + query

		client
			.get(endpoint)
			.then((res) => setTransactionRows(res.data.data))
			.catch((err) => console.error(err))

		client
			.get("/users")
			.then((res) => {
				setUsers(res.data.data)
			})
			.catch((err) => {
				console.error(err)
			})

		client
			.get("/products")
			.then((res) => {
				setProducts(res.data.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [currentUser])

	const widgetData = {
		users: {
			thisMonth: getThisPeriodItems("month", users),
			lastMonth: getLastPeriodItems("month", users),
		},
		products: {
			thisMonth: getThisPeriodItems("month", products),
			lastMonth: getLastPeriodItems("month", products),
		},
		transactions: {
			thisMonth: getThisPeriodItems("month", transactionRows),
			lastMonth: getLastPeriodItems("month", transactionRows),
		},
	}

	return (
		<div className="home">
			<Sidebar />
			<div className="home-container">
				<Navbar />
				<ul className="widgets">
					<Widget
						type="user"
						amount={widgetData.users.thisMonth.length}
						diff={getDataDiff(
							widgetData.users.thisMonth.length,
							widgetData.users.lastMonth.length
						)}
					/>
					<Widget
						type="product"
						amount={widgetData.products.thisMonth.length}
						diff={getDataDiff(
							widgetData.products.thisMonth.length,
							widgetData.products.lastMonth.length
						)}
					/>
					<Widget
						type="order"
						amount={widgetData.transactions.thisMonth.length}
						diff={getDataDiff(
							widgetData.transactions.thisMonth.length,
							widgetData.transactions.lastMonth.length
						)}
					/>
					<Widget
						type="earning"
						amount={getRevenue(widgetData.transactions.thisMonth)}
						diff={getDataDiff(
							getRevenue(widgetData.transactions.thisMonth),
							getRevenue(widgetData.transactions.lastMonth)
						)}
					/>
				</ul>
				<div className="charts">
					<Featured transactions={transactionRows} />
					<Chart
						title="Last 6 Months (Revenue)"
						aspect={2 / 1}
						data={getProductRevenueData(transactionRows)}
					/>
				</div>
				<div className="list-container">
					<div className="list-title">Latest Transactions</div>
					<TransactionTable rowData={transactionRows} />
				</div>
			</div>
		</div>
	)
}
