export const userColumns = [
	{
		field: "username",
		headerName: "Username",
		width: 150,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.username
		},
	},
	{
		field: "fullName",
		headerName: "Full Name",
		width: 200,
		headerAlign: "center",
		align: "left",
		renderCell: (params) => {
			return (
				<div className="cell-with-img">
					<img className="cell-img" src={params.row.profile.imgUrl} alt="avatar" />
					{params.row.profile.fullName}
				</div>
			)
		},
	},
	{
		field: "email",
		headerName: "Email",
		width: 200,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.email
		},
	},
	{
		field: "phone",
		headerName: "Phone Number",
		width: 180,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.profile.phone
		},
	},
	{
		field: "role",
		headerName: "Role",
		width: 120,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.role
		},
	},
	{
		field: "country",
		headerName: "Country",
		width: 100,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.profile.country
		},
	},
]

function getProductStatus(product, lowStock = 15) {
	if (product.stock === 0) {
		return "No stock"
	} else if (product.stock < lowStock) {
		return "Low stock"
	} else {
		return "In stock"
	}
}

export const productColumns = [
	{
		field: "category",
		headerName: "Category",
		width: 120,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.category
		},
	},
	{
		field: "title",
		headerName: "Title",
		width: 230,
		headerAlign: "center",
		align: "left",
		renderCell: (params) => {
			return (
				<div className="cell-with-img">
					<img className="cell-img" src={params.row.imgUrl} alt="avatar" />
					{params.row.title}
				</div>
			)
		},
	},

	{
		field: "description",
		headerName: "Description",
		width: 230,
		headerAlign: "center",
		align: "left",
		valueGetter: (params) => {
			return params.row.description
		},
	},
	{
		field: "price",
		headerName: "Price",
		width: 120,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.price
		},
	},
	{
		field: "stock",
		headerName: "Stock",
		width: 120,
		headerAlign: "center",
		align: "center",
		valueGetter: (params) => {
			return params.row.stock
		},
	},
	{
		field: "status",
		headerName: "Status",
		headerAlign: "center",
		align: "center",
		width: 120,
		renderCell: (params) => {
			return (
				<div
					className={`cell-with-status ${getProductStatus(params.row)
						.split(" ")
						.join("-")}`}
				>
					{getProductStatus(params.row)}
				</div>
			)
		},
	},
]
