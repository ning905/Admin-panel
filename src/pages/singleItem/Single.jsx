import "./single.scss"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Chart from "../../components/chart/Chart.jsx"
import RevenueTable from "../../components/revenueTable/RevenueTable.jsx"

export default function Single() {
	return (
		<div className="single">
			<Sidebar />
			<div className="single-container">
				<Navbar />
				<div className="top">
					<div className="left">
						<div className="edit-button">Edit</div>
						<h1 className="title">Information</h1>
						<div className="item">
							<img
								src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
								alt="item"
								className="item-img"
							/>
							<ul className="details">
								<h1 className="item-title">Jan Doe</h1>
								<li className="detail-item">
									<span className="item-key">Email:</span>
									<span className="item-value">janedoe@gmail.com</span>
								</li>
								<li className="detail-item">
									<span className="item-key">Phone:</span>
									<span className="item-value">012345678</span>
								</li>
								<li className="detail-item">
									<span className="item-key">Address:</span>
									<span className="item-value">W Mosley St, Manchester</span>
								</li>
								<li className="detail-item">
									<span className="item-key">Country:</span>
									<span className="item-value">UK</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="right">
						<Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
					</div>
				</div>
				<div className="bottom">
					<h1 className="title">Last Transactions</h1>

					<RevenueTable />
				</div>
			</div>
		</div>
	)
}
