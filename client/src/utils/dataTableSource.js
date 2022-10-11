export const userColumns = [
	{ field: "id", headerName: "ID", width: 70 },
	{
		field: "user",
		headerName: "User",
		width: 230,
		renderCell: (params) => {
			return (
				<div className="cell-with-img">
					<img className="cell-img" src={params.row.img} alt="avatar" />
					{params.row.username}
				</div>
			)
		},
	},
	{
		field: "email",
		headerName: "Email",
		width: 230,
	},

	{
		field: "address",
		headerName: "Address",
		width: 100,
	},
	{
		field: "country",
		headerName: "Country",
		width: 160,
	},
]
// {
// 	field: "status",
// 	headerName: "Status",
// 	width: 160,
// 	renderCell: (params) => {
// 		return (
// 			<div className={`cell-with-status ${params.row.status}`}>
// 				{params.row.status}
// 			</div>
// 		)
// 	},
// },
