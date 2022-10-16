import dbClient from "../utils/dbClient.js"
import {
	BadRequestError,
	InternalServerError,
	NoAccessError,
	NotFoundError,
} from "../utils/Error.js"
import {
	sendDataResponse,
	sendMessageResponse,
} from "../utils/serverResponse.js"

const serverError = new InternalServerError()

export async function getAllProductsForUser(req, res) {
	const query = {
		orderBy: {
			createdAt: "desc",
		},
		include: {
			transactions: true,
		},
	}

	if (req.user.role !== "ADMIN") {
		query.where = {
			sellerId: req.user.id,
		}
	}

	try {
		const products = await dbClient.product.findMany(query)
		sendDataResponse(res, 200, products)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

export async function deleteProductById(req, res) {
	const id = req.params.id
	const foundProduct = await dbClient.product.findUnique({ where: { id } })
	if (!foundProduct) {
		const notFound = new NotFoundError("product", "id")
		return sendMessageResponse(res, notFound.code, notFound.message)
	}
	console.log("foundProduct: ", foundProduct)
	console.log("req user: ", req.user.role)
	if (req.user.id !== foundProduct.sellerId && req.user.role !== "ADMIN") {
		const noAccess = new NoAccessError("Only the seller or admin can access")
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}

	try {
		const deletedProduct = await dbClient.product.delete({ where: { id } })
		return sendDataResponse(res, 200, deletedProduct)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

export async function createProduct(req, res) {
	const { title, description, category, price, stock, imgUrl } = req.body
	let sellerUsername

	if (req.body.sellerUsername) {
		sellerUsername = req.body.sellerUsername
	} else if (req.user.role === "USER") {
		sellerUsername = req.user.username
	}

	const foundSeller = await dbClient.user.findUnique({
		where: { username: sellerUsername },
	})

	if (!foundSeller) {
		const notFound = new NotFoundError("user", "username")
		return sendMessageResponse(res, notFound.code, notFound.message)
	}

	if (foundSeller && req.user.role !== "ADMIN") {
		const noAccess = new NoAccessError(
			"Only admin can create products for sellers"
		)
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}

	if (!Number.isInteger(Number(stock))) {
		const error = new BadRequestError("Stock must be an integer")
		return sendMessageResponse(res, error.code, error.message)
	}

	if (price.includes(".")) {
		const arr = price.split(".")
		if (arr[1].length > 2) {
			const error = new BadRequestError("Price can only accept 2 decimal places")
			return sendMessageResponse(res, error.code, error.message)
		}
	}

	try {
		const product = await dbClient.product.create({
			data: {
				title,
				description,
				category,
				price,
				stock: Number(stock),
				imgUrl,
				seller: { connect: { username: sellerUsername } },
			},
		})

		return sendDataResponse(res, 201, product)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}
