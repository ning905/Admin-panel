import dbClient from "../utils/dbClient.js"
import { InternalServerError, NoAccessError } from "../utils/Error.js"
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
