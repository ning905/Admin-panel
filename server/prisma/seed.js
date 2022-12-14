import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
	const users = []
	const products = []
	const transactions = []
	const saltRounds = 8
	const hashed = await bcrypt.hash("123", saltRounds)
	const userData = {
		password: hashed,
		phone: "012345678",
		address: "Some house, Some Street, Some City",
		country: "UK",
		profileImages: [
			"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80",
			"https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
			"https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
			"https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=601&q=80",
			"https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1829&q=80",
			"https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
			"https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
			"https://images.unsplash.com/photo-1506891536236-3e07892564b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
			"https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
			"https://images.unsplash.com/photo-1572252821143-035a024857ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
		],
	}
	const productData = [
		{
			title: "Acer Nitro 5",
			category: "electronics",
			img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
			price: 678.98,
			stock: 30,
		},
		{
			title: "Playstation 5",
			img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
			stock: 35,
			price: 681,
			category: "electronics",
		},
		{
			title: "Redragon S101",
			img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
			stock: 55,
			price: 47.99,
			category: "electronics",
		},
		{
			title: "Razer Blade 15",
			img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
			stock: 30,
			price: 1555.65,
			category: "electronics",
		},
		{
			title: "ASUS ROG Strix",
			img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
			stock: 40,
			price: 1959.99,
			category: "electronics",
		},
	]
	const customers = ["John Smith", "Michael Doe", "Jane Smith", "Harold Carol"]

	const createdAdmin = await prisma.user.create({
		data: {
			email: "admin@admin.com",
			username: "admin",
			password: userData.password,
			role: "ADMIN",
			profile: {
				create: {
					fullName: "Admin Admin",
					phone: userData.phone,
					address: userData.address,
					country: userData.country,
					imgUrl:
						"https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=972&q=80",
				},
			},
		},
	})
	users.push(createdAdmin)

	async function createUser(email, username, fullName, imgUrl) {
		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: userData.password,
				role: "USER",
				profile: {
					create: {
						fullName,
						phone: userData.phone,
						address: userData.address,
						country: userData.country,
						imgUrl,
					},
				},
			},
		})
		return user
	}

	async function createProduct(title, category, price, stock, imgUrl, sellerId) {
		const product = await prisma.product.create({
			data: {
				title,
				description: "This is a " + title,
				category,
				price,
				stock,
				imgUrl,
				sellerId,
			},
		})
		return product
	}

	async function createTransaction(
		amount,
		paymentMethod,
		status,
		customer,
		productId
	) {
		const transaction = await prisma.transaction.create({
			data: {
				amount,
				paymentMethod,
				status,
				customer,
				productId,
			},
		})
		return transaction
	}

	for (let i = 0; i < userData.profileImages.length; i++) {
		const newUser = await createUser(
			`user${i}@user.com`,
			`username${i}`,
			`User${i} User`,
			userData.profileImages[i]
		)
		users.push(newUser)
	}

	for (let i = 0; i < productData.length; i++) {
		const data = productData[i]
		const newProduct = await createProduct(
			data.title,
			data.category,
			data.price,
			data.stock,
			data.img,
			users[i].id
		)
		products.push(newProduct)
	}

	async function createTransactionsForUsers() {
		let paymentMethod = "ONLINE"
		let status = "PENDING"

		for (let i = 1; i < users.length; i++) {
			let amount = Math.ceil(Math.random() * 20)
			const index = Math.floor((i - 1) / 2)
			let product = products[index]
			let customer = customers[Math.floor(index / 1.2)]
			let newTransaction

			if (i > 4) {
				status = "APPROVED"
			}

			if (i > 7) {
				paymentMethod = "CASH_ON_DELIVERY"
				status = "CANCELLED"
			}

			if (amount > product.stock) {
				amount = product.stock
			}

			if (amount > 0) {
				newTransaction = await createTransaction(
					amount,
					paymentMethod,
					status,
					customer,
					product.id
				)
			}

			if (newTransaction) {
				const updatedProduct = await prisma.product.update({
					where: { id: product.id },
					data: {
						stock: product.stock - amount,
					},
				})
				products.splice(index, 1, updatedProduct)
				transactions.push(newTransaction)
			}
		}
	}

	await createTransactionsForUsers()

	console.log("Users created: ", users)
	console.log("Products created: ", products)
	console.log("Transactions created: ", transactions)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
