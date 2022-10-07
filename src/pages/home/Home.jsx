import Chart from "../../components/chart/Chart"
import Featured from "../../components/featured/Featured"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import RevenueTable from "../../components/revenueTable/RevenueTable"
import Widget from "../../components/widget/Widget"
import "./home.scss"

export default function Home() {
	return (
		<div className="home">
			<Sidebar />
			<div className="home-container">
				<Navbar />
				<ul className="widgets">
					<Widget type="user" />
					<Widget type="order" />
					<Widget type="earning" />
					<Widget type="balance" />
				</ul>
				<div className="charts">
					<Featured />
					<Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
				</div>
				<div className="list-container">
					<div className="list-title">Latest Transactions</div>
					<RevenueTable />
				</div>
			</div>
		</div>
	)
}
