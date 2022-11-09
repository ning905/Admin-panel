import {
	PersonOutlined,
	AccountBalanceWalletOutlined,
	ShoppingCartOutlined,
	MonetizationOnOutlined,
} from "@mui/icons-material"

export const widget = {
	user: {
		title: "USERS",
		isMoney: false,
		link: "See all users",
		path: "/users",
		icon: (
			<PersonOutlined
				className="icon"
				style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
			/>
		),
	},

	product: {
		title: "PRODUCTS",
		isMoney: false,
		path: "/products",
		link: "See details",
		icon: (
			<AccountBalanceWalletOutlined
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
		path: "/",
		icon: (
			<ShoppingCartOutlined
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
		path: "/",
		icon: (
			<MonetizationOnOutlined
				className="icon"
				style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
			/>
		),
	},
}
