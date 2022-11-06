export const userInit = {
	username: null,
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

export const productInit = {
	title: "",
	description: "",
	category: "",
	price: "",
	stock: "",
	sellerUsername: "",
}

export const productInputs = [
	{
		id: 1,
		label: "Title",
		name: "title",
		type: "text",
		required: true,
	},
	{
		id: 2,
		label: "Description",
		name: "description",
		type: "text",
		required: true,
	},
	{
		id: 3,
		label: "Category",
		name: "category",
		type: "text",
		required: true,
	},
	{
		id: 4,
		label: "Price",
		name: "price",
		type: "number",
		required: true,
		step: ".01",
	},
	{
		id: 5,
		label: "Stock",
		name: "stock",
		type: "number",
		required: true,
	},
]

export const adminProductInput = [
	{
		id: 6,
		label: "Seller Username",
		name: "sellerUsername",
		type: "text",
		required: true,
	},
]
