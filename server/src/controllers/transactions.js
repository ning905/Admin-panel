import dbClient from "../utils/dbClient.js"
import { InternalServerError } from "../utils/Error.js"
import {
	sendDataResponse,
	sendMessageResponse,
} from "../utils/serverResponse.js"

const serverError = new InternalServerError()

export async function getAllTransactions(req, res) {
	let query = {
		skip: 0,
		take: 100,
		orderBy: {
			createdAt: "desc",
		},
		include: {
			product: true,
		},
	}

	if (req.user.role !== "ADMIN") {
		query.where = {
			sellerId: req.user.id,
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
