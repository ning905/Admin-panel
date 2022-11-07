import jwt from "jsonwebtoken"
import dbClient from "../utils/dbClient.js"
import { InvalidAuthError, NoAccessError } from "../utils/Error.js"
import { sendMessageResponse } from "../utils/serverResponse.js"

function validateType(type) {
	if (!type || typeof type !== "string") {
		return false
	}

	if (type.toUpperCase() === "BEARER") {
		return true
	}

	return false
}

function verifyJWT(token) {
	try {
		const { username } = jwt.verify(token, process.env.JWT_SECRET)
		return username
	} catch (err) {
		const noAccess = new NoAccessError(err.message)
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}
}

export async function validateAuthentication(req, res, next) {
	const header = req.header("authorization")

	if (!header) {
		const error = new InvalidAuthError("Missing Authorization header")
		return sendMessageResponse(res, error.code, error.message)
	}

	const [type, token] = header.split(" ")

	const typeIsValid = validateType(type)
	if (!typeIsValid) {
		const error = new InvalidAuthError(
			`Invalid token type, expected Bearer but got ${type}`
		)
		return sendMessageResponse(res, error.code, error.message)
	}

	if (!token) {
		const error = new InvalidAuthError("Missing access token")
		return sendMessageResponse(res, error.code, error.message)
	}

	const username = verifyJWT(token)

	const foundUser = await dbClient.user.findUnique({ where: { username } })
	if (!foundUser) {
		const noAccess = new NoAccessError("Invalid token")
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}

	delete foundUser.password
	req.user = foundUser

	next()
}

export function validateAdmin(req, res, next) {
	if (!req.user) {
		const error = new InvalidAuthError("Invalid user")
		return sendMessageResponse(res, error.code, error.message)
	}

	if (req.user.role !== "ADMIN") {
		const noAccess = new NoAccessError("Only admins can access")
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}

	next()
}
