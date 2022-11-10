import "./widget.scss"
import { widget } from "../../utils/widgetSource"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Link } from "react-router-dom"

export default function Widget({ type, amount, diff }) {
	const data = widget[type]

	function getPercentageClassName(diff) {
		let className = "percentage"
		if (diff >= 0) {
			className += " positive"
		} else {
			className += " negative"
		}
		return className
	}

	return (
		<li className="widget">
			<div className="left">
				<span className="title">{data.title}</span>
				<span className="counter">
					{data.isMoney && "£"} {amount}
				</span>
				<Link to={data.path} style={{ textDecoration: "none" }}>
					<span className="link">{data.link}</span>
				</Link>
			</div>
			<div className="right">
				<div className={getPercentageClassName(diff)}>
					{diff < 0 ? (
						<KeyboardArrowDown fontSize="small" />
					) : (
						<KeyboardArrowUp fontSize="small" />
					)}
					{Math.abs(diff)} %
				</div>
				{data.icon}
			</div>
		</li>
	)
}
