import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined"

export const widget = {
	user: {
		title: "USERS",
		isMoney: false,
		link: "See all users",
		icon: (
			<PersonOutlinedIcon
				className="icon"
				style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
			/>
		),
	},

	product: {
		title: "PRODUCTS",
		isMoney: false,
		link: "See details",
		icon: (
			<AccountBalanceWalletOutlinedIcon
				className="icon"
				style={{
					backgroundColor: "rgba(128, 0, 128, 0.2)",
					color: "purple",
				}}
			/>
		),
	},

	order: {
		title: "ORDERS",
		isMoney: false,
		link: "View all orders",
		icon: (
			<ShoppingCartOutlinedIcon
				className="icon"
				style={{
					backgroundColor: "rgba(218, 165, 32, 0.2)",
					color: "goldenrod",
				}}
			/>
		),
	},

	earning: {
		title: "EARNINGS",
		isMoney: true,
		link: "View net earnings",
		icon: (
			<MonetizationOnOutlinedIcon
				className="icon"
				style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
			/>
		),
	},
}
