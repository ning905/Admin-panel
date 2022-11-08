import "./featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined"
import {
	getLastMonthTransactions,
	getLastWeekTransactions,
	getRevenue,
	getThisMonthTransactions,
	getThisWeekTransactions,
	getTodayTransactions,
} from "../../utils/getChartData"

export default function Featured({ transactions }) {
	const target = 12400
	const todayRevenue = getRevenue(getTodayTransactions(transactions))
	const thisWeekRevenue = getRevenue(getThisWeekTransactions(transactions))
	const lastWeekRevenue = getRevenue(getLastWeekTransactions(transactions))
	const thisMonthRevenue = getRevenue(getThisMonthTransactions(transactions))
	const lastMonthRevenue = getRevenue(getLastMonthTransactions(transactions))

	function getItemResultClassName(sales, target) {
		let className = "item-result"
		if (sales >= target) {
			className += " positive"
		} else {
			className += " negative"
		}
		return className
	}

	function getDisplayNum(number) {
		return (number / 1000).toFixed(1)
	}

	return (
		<div className="featured">
			<div className="top">
				<h1 className="title">Total Revenue</h1>
				<MoreVertIcon fontSize="small" />
			</div>

			<div className="bottom">
				<div className="featured-chart">
					<CircularProgressbar
						value={todayRevenue / target}
						text={`${todayRevenue / target}%`}
						strokeWidth={5}
					/>
				</div>

				<p className="title">Total sales made today</p>
				<p className="amount">£{todayRevenue}</p>
				<p className="desc">
					Previous transactions processing. Last payments may not be included.
				</p>
				<ul className="summary">
					<li className="item">
						<div className="item-title">Target</div>
						<div className={getItemResultClassName(todayRevenue, target)}>
							{todayRevenue < target ? (
								<KeyboardArrowDownIcon fontSize="small" />
							) : (
								<KeyboardArrowUpOutlinedIcon fontSize="small" />
							)}
							<div className="result-amount">£{getDisplayNum(target)}k</div>
						</div>
					</li>
					<li className="item">
						<div className="item-title">Last Week</div>
						<div className={getItemResultClassName(thisWeekRevenue, lastWeekRevenue)}>
							{thisWeekRevenue < lastWeekRevenue ? (
								<KeyboardArrowDownIcon fontSize="small" />
							) : (
								<KeyboardArrowUpOutlinedIcon fontSize="small" />
							)}
							<div className="result-amount">£{getDisplayNum(lastWeekRevenue)}k</div>
						</div>
					</li>
					<li className="item">
						<div className="item-title">Last Month</div>
						<div
							className={getItemResultClassName(thisMonthRevenue, lastMonthRevenue)}
						>
							{thisMonthRevenue < lastMonthRevenue ? (
								<KeyboardArrowDownIcon fontSize="small" />
							) : (
								<KeyboardArrowUpOutlinedIcon fontSize="small" />
							)}
							<div className="result-amount">£{getDisplayNum(lastMonthRevenue)}k</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}
