import dbClient from "../utils/dbClient.js"
import { InternalServerError } from "../utils/Error.js"
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
