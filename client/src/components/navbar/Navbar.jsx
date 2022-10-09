import "./navbar.scss"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import ListOutlinedIcon from "@mui/icons-material/ListOutlined"
import avatar from "../../assets/img/avatar.jpg"
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext.js"

export default function Navbar() {
	const { dispatch } = useContext(DarkModeContext)

	return (
		<nav className="navbar">
			<div className="wrapper">
				<div className="search">
					<input type="text" placeholder="Search..." />
					<SearchOutlinedIcon />
				</div>

				<ul className="items">
					<li className="item">
						<LanguageOutlinedIcon className="icon" />
						English
					</li>
					<li className="item">
						<DarkModeOutlinedIcon
							className="icon"
							onClick={() => dispatch({ type: "TOGGLE" })}
						/>
					</li>
					<li className="item">
						<FullscreenExitOutlinedIcon className="icon" />
					</li>
					<li className="item">
						<NotificationsNoneOutlinedIcon className="icon" />
						<div className="counter">1</div>
					</li>
					<li className="item">
						<ChatBubbleOutlineOutlinedIcon className="icon" />
						<div className="counter">2</div>
					</li>
					<li className="item">
						<ListOutlinedIcon className="icon" />
					</li>
					<li className="item">
						<img src={avatar} alt="avatar" className="avatar" />
					</li>
				</ul>
			</div>
		</nav>
	)
}
