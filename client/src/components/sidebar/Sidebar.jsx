import "./sidebar.scss"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import StoreIcon from "@mui/icons-material/Store"
import InsertChartIcon from "@mui/icons-material/InsertChart"
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined"
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { DarkModeContext } from "../../context/darkModeContext.js"
import { AuthContext } from "../../context/AuthContext"

export default function Sidebar() {
	const { dispatch } = useContext(DarkModeContext)
	const { currentUser, userAction } = useContext(AuthContext)
	const navigate = useNavigate()

	function handleLogout() {
		navigate("/login")
		userAction({ type: "LOGOUT" })
		localStorage.removeItem(process.env.REACT_APP_USER_TOKEN)
	}

	return (
		<aside className="sidebar">
			<div className="top">
				<Link to="/" style={{ textDecoration: "none" }}>
					<div className="logo">Admin</div>
				</Link>
			</div>
			<hr />
			<div className="center">
				<ul>
					<p className="title">MAIN</p>
					<Link to="/" style={{ textDecoration: "none" }}>
						<li>
							<DashboardIcon className="icon" />
							<span>Dashboard</span>
						</li>
					</Link>

					<p className="title">LISTS</p>

					{currentUser?.role === "ADMIN" && (
						<Link to="/users" style={{ textDecoration: "none" }}>
							<li>
								<PersonOutlineIcon className="icon" />
								<span>Users</span>
							</li>
						</Link>
					)}

					<Link to="/products" style={{ textDecoration: "none" }}>
						<li>
							<StoreIcon className="icon" />
							<span>Products</span>
						</li>
					</Link>

					<li>
						<CreditCardIcon className="icon" />
						<span>Orders*</span>
					</li>

					<li>
						<LocalShippingIcon className="icon" />
						<span>Delivery*</span>
					</li>

					<p className="title">USEFUL LINKS</p>
					<li>
						<InsertChartIcon className="icon" />
						<span>Stats*</span>
					</li>
					<li>
						<NotificationsNoneIcon className="icon" />
						<span>Notifications*</span>
					</li>

					<p className="title">SERVICE</p>
					<li>
						<SettingsSystemDaydreamOutlinedIcon className="icon" />
						<span>System Health*</span>
					</li>
					<li>
						<PsychologyOutlinedIcon className="icon" />
						<span>Logs*</span>
					</li>
					<li>
						<SettingsApplicationsIcon className="icon" />
						<span>Settings*</span>
					</li>

					<p className="title">USER</p>

					<Link to="/users/profile" style={{ textDecoration: "none" }}>
						<li>
							<AccountCircleOutlinedIcon className="icon" />
							<span>Profile</span>
						</li>
					</Link>

					<li onClick={handleLogout}>
						<ExitToAppIcon className="icon" />
						<span>Logout</span>
					</li>
				</ul>
			</div>
			<div className="bottom">
				<div
					className="color-option"
					onClick={() => dispatch({ type: "LIGHT" })}
				></div>
				<div
					className="color-option"
					onClick={() => dispatch({ type: "DARK" })}
				></div>
			</div>
		</aside>
	)
}
