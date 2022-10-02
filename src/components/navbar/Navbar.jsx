import "./navbar.scss"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import ListOutlinedIcon from "@mui/icons-material/ListOutlined"
import avatar from "../../assets/img/avatar.jpg"

export default function Navbar() {
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
						<DarkModeOutlinedIcon className="icon" />
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
