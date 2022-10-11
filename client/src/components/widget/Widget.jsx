import "./widget.scss"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { widget } from "../../utils/widgetSource"

export default function Widget({ type }) {
	//temporary
	const amount = 100
	const diff = 20
	const data = widget[type]

	return (
		<li className="widget">
			<div className="left">
				<span className="title">{data.title}</span>
				<span className="counter">
					{data.isMoney && "£"} {amount}
				</span>
				<span className="link">{data.link}</span>
			</div>
			<div className="right">
				<div className="percentage positive">
					<KeyboardArrowUpIcon />
					{diff} %
				</div>
				{data.icon}
			</div>
		</li>
	)
}
