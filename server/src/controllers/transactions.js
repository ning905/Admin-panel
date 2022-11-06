import dbClient from "../utils/dbClient.js"
import { InternalServerError } from "../utils/Error.js"
import {
	sendDataResponse,
	sendMessageResponse,
} from "../utils/serverResponse.js"

const serverError = new InternalServerError()

export async function getAllTransactionsForUser(req, res) {
	const query = {
		skip: 0,
		take: 100,
		orderBy: {
			createdAt: "desc",
		},
		include: {
			product: true,
		},
	}

	if (req.query) {
		query.where = {
			product: {},
		}

		if (req.query.sellerId) {
			query.where.product.sellerId = req.query.sellerId
		}

		if (req.query.productId) {
			query.where.product.id = req.query.productId
		}
	}

	try {
		const transactions = await dbClient.transaction.findMany(query)
		sendDataResponse(res, 200, transactions)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}
