import "./single.scss"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Chart from "../../components/chart/Chart.jsx"
import TransactionTable from "../../components/transactionTable/TransactionTable.jsx"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link, useLocation, useParams } from "react-router-dom"
import client from "../../utils/client"
import { productInfo } from "../../utils/itemInfoFields"
import {
	getProductRevenueData,
	getUserEarningData,
} from "../../utils/getChartData"

export default function Single() {
	const [page, setPage] = useState({
		chartTitle: "",
		infoFields: [],
		itemToDisplay: {},
		itemType: "",
	})
	const [transactionRows, setTransactionRows] = useState([])
	const [chartData, setChartData] = useState([])
	const [alert, setAlert] = useState({})
	const { currentUser } = useContext(AuthContext)
	const location = useLocation()
	const params = useParams()

	useEffect(() => {
		if (location.pathname.includes("/products")) {
			setPage((pre) => ({
				...pre,
				chartTitle: "Revenue (Last 6 Months)",
				infoFields: productInfo,
				itemType: "product",
			}))

			client
				.get(`/products/${params.productId}`)
				.then((res) => {
					setPage((pre) => ({
						...pre,
						itemToDisplay: res.data.data,
					}))
					setTransactionRows(res.data.data.transactions)
					setChartData(getProductRevenueData(res.data.data.transactions))
				})
				.catch((err) => {
					setAlert({
						status: "error",
						message: err.response.data.message,
					})

					setTimeout(() => {
						setAlert({})
					}, "3000")
				})
		} else if (location.pathname.includes("/users")) {
			setPage((pre) => ({
				...pre,
				chartTitle: "User Earning (Last 6 Months)",
				itemType: "user",
			}))

			if (params.username && currentUser.role === "ADMIN") {
				client
					.get(`/users/${params.username}`)
					.then((res) => {
						setPage((pre) => ({ ...pre, itemToDisplay: res.data.data }))
					})
					.catch((err) => {
						setAlert({
							status: "error",
							message: err.response.data.message,
						})

						setTimeout(() => {
							setAlert({})
						}, "3000")
					})
			} else {
				setPage((pre) => ({ ...pre, itemToDisplay: currentUser }))
			}
		}
	}, [currentUser, location, params])

	useEffect(() => {
		if (page.itemType === "user") {
			client
				.get(`/transactions?sellerId=${page.itemToDisplay.id}`)
				.then((res) => {
					setTransactionRows(res.data.data)
					setChartData(getUserEarningData(res.data.data))
				})
				.catch((err) => console.error(err))
		}
	}, [page])

	return (
		<div className="single">
			<Sidebar />
			<div className="single-container">
				<Navbar />

				{alert.message && <h2 className={alert.status}>{alert.message}</h2>}
				<div className="top">
					<div className="left">
						{page.itemType === "user" &&
							(currentUser.role === "ADMIN" ||
								currentUser.id === page.itemToDisplay.id) && (
								<Link
									to={`/users/edit/${page.itemToDisplay.username}`}
									style={{ textDecoration: "none" }}
								>
									<div className="edit-button">Edit</div>
								</Link>
							)}

						{page.itemType === "product" &&
							(currentUser.role === "ADMIN" ||
								currentUser.id === page.itemToDisplay.sellerId) && (
								<Link
									to={`/products/edit/${page.itemToDisplay.id}`}
									style={{ textDecoration: "none" }}
								>
									<div className="edit-button">Edit</div>
								</Link>
							)}

						<h1 className="title">Information</h1>

						{page.itemType === "user" && (
							<div className="item">
								<img
									src={page.itemToDisplay.profile?.imgUrl}
									alt="item"
									className="item-img"
								/>

								<ul className="details">
									<h1 className="item-title">{page.itemToDisplay.profile?.fullName}</h1>

									<li className="detail-item">
										<span className="item-key">Email:</span>
										<span className="item-value">{page.itemToDisplay.email}</span>
									</li>
									<li className="detail-item">
										<span className="item-key">Phone:</span>
										<span className="item-value">
											{page.itemToDisplay.profile?.phone}
										</span>
									</li>
									<li className="detail-item">
										<span className="item-key">Address:</span>
										<span className="item-value">
											{page.itemToDisplay.profile?.address}
										</span>
									</li>
									<li className="detail-item">
										<span className="item-key">Country:</span>
										<span className="item-value">
											{page.itemToDisplay.profile?.country}
										</span>
									</li>
								</ul>
							</div>
						)}

						{page.itemType === "product" && (
							<div className="item">
								<img src={page.itemToDisplay.imgUrl} alt="item" className="item-img" />

								<ul className="details">
									<h1 className="item-title">{page.itemToDisplay.title}</h1>

									{page.infoFields.map((info, index) => (
										<li key={index} className="detail-item">
											<span className="item-key">{info.key}:</span>
											<span className="item-value">{page.itemToDisplay[info.source]}</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<div className="right">
						<Chart aspect={3 / 1} title={page.chartTitle} data={chartData} />
					</div>
				</div>

				<div className="bottom">
					<h1 className="title">Last Transactions</h1>

					<TransactionTable rowData={transactionRows} />
				</div>
			</div>
		</div>
	)
}
