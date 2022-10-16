export const userInit = {
	username: "",
	email: "",
	password: "",
	phone: "",
	fullName: "",
	address: "",
	country: "",
}

export const userInputs = [
	{
		id: 1,
		label: "Username",
		name: "username",
		type: "text",
		required: true,
	},
	{
		id: 2,
		label: "Email",
		name: "email",
		type: "email",
		required: true,
	},
	{
		id: 3,
		label: "Password",
		name: "password",
		type: "password",
		required: true,
	},
	{
		id: 4,
		label: "Phone Number",
		name: "phone",
		type: "text",
		required: true,
	},
	{
		id: 5,
		label: "Full Name",
		name: "fullName",
		type: "text",
		required: true,
	},
	{
		id: 6,
		label: "Address",
		name: "address",
		type: "text",
		required: false,
	},
	{
		id: 7,
		label: "Country",
		name: "country",
		type: "text",
		required: false,
	},
]

export const productInputs = [
	{
		id: 1,
		label: "Title",
		type: "text",
		placeholder: "Apple Macbook Pro",
	},
	{
		id: 2,
		label: "Description",
		type: "text",
		placeholder: "Description",
	},
	{
		id: 3,
		label: "Category",
		type: "text",
		placeholder: "Computers",
	},
	{
		id: 4,
		label: "Price",
		type: "text",
		placeholder: "100",
	},
	{
		id: 5,
		label: "Stock",
		type: "text",
		placeholder: "in stock",
	},
]
