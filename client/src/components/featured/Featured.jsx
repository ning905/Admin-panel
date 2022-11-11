import "./featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined"
import {
	getLastPeriodItems,
	getRevenue,
	getThisPeriodItems,
} from "../../utils/getChartData"

export default function Featured({ transactions }) {
	const target = 12400
	const thisWeekRevenue = getRevenue(getThisPeriodItems("week", transactions))
	const lastWeekRevenue = getRevenue(getLastPeriodItems("week", transactions))
	const thisMonthRevenue = getRevenue(getThisPeriodItems("month", transactions))
	const lastMonthRevenue = getRevenue(getLastPeriodItems("month", transactions))

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
		return Math.abs(number / 1000).toFixed(1)
	}

	function getProgressBarData() {
		let progress = (thisWeekRevenue / target) * 100
		if (progress % 1) {
			progress = progress.toFixed(1)
		}

		return progress
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
						value={getProgressBarData()}
						text={`${getProgressBarData()}%`}
						strokeWidth={5}
					/>
				</div>

				<p className="title">Total sales made this week</p>
				<p className="amount">£{thisWeekRevenue}</p>
				<p className="desc">
					Previous transactions processing. Last payments may not be included.
				</p>
				<ul className="summary">
					<li className="item">
						<div className="item-title">Target</div>
						<div className={getItemResultClassName(thisWeekRevenue, target)}>
							{thisWeekRevenue < target ? (
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
							<div className="result-amount">
								£{getDisplayNum(thisWeekRevenue - lastWeekRevenue)}k
							</div>
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
							<div className="result-amount">
								£{getDisplayNum(thisMonthRevenue - lastMonthRevenue)}k
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}
