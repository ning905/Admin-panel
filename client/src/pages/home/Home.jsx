import Chart from "../../components/chart/Chart.jsx"
import Featured from "../../components/featured/Featured.jsx"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import TransactionTable from "../../components/transactionTable/TransactionTable.jsx"
import Widget from "../../components/widget/Widget.jsx"
import "./home.scss"

export default function Home() {
	return (
		<div className="home">
			<Sidebar />
			<div className="home-container">
				<Navbar />
				<ul className="widgets">
					<Widget type="user" />
					<Widget type="product" />
					<Widget type="order" />
					<Widget type="earning" />
				</ul>
				<div className="charts">
					<Featured />
					<Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
				</div>
				<div className="list-container">
					<div className="list-title">Latest Transactions</div>
					<TransactionTable />
				</div>
			</div>
		</div>
	)
}
