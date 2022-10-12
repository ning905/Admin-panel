import dbClient from "../utils/dbClient.js"
import {
	BadRequestError,
	InternalServerError,
	InvalidLoginError,
	NotFoundError,
	ServerConflictError,
} from "../utils/Error.js"
import {
	sendDataResponse,
	sendMessageResponse,
} from "../utils/serverResponse.js"
import { generateJwt, validateCredentials } from "./utils.js"
import bcrypt from "bcrypt"

const serverError = new InternalServerError()
const saltRounds = 8

export async function login(req, res) {
	const { email, password } = req.body

	if (!email || !password) {
		const error = new BadRequestError("Invalid email and/or password provided")
		return sendMessageResponse(res, error.code, error.message)
	}

	try {
		const invalidLogin = new InvalidLoginError()
		const foundUser = await dbClient.user.findUnique({ where: { email } })
		if (!foundUser) {
			return sendMessageResponse(res, invalidLogin.code, invalidLogin.message)
		}

		const passwordIsValid = await validateCredentials(foundUser, password)
		if (!passwordIsValid) {
			return sendMessageResponse(res, invalidLogin.code, invalidLogin.message)
		}

		const token = generateJwt(foundUser.username)
		return sendDataResponse(res, 200, token)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

export async function signUp(req, res) {
	const { email, username, password, fullName, phone } = req.body

	try {
		const foundByEmail = await dbClient.user.findUnique({ where: { email } })
		const foundByUsername = await dbClient.user.findUnique({
			where: { username },
		})

		if (foundByEmail) {
			const emailInUse = new ServerConflictError("Email already in use")
			sendMessageResponse(res, emailInUse.code, emailInUse.message)
		}
		if (foundByUsername) {
			const usernameInUse = new ServerConflictError("Username already in use")
			sendMessageResponse(res, usernameInUse.code, usernameInUse.message)
		}

		const hashed = await bcrypt.hash(password, saltRounds)

		const createdUser = await dbClient.user.create({
			data: {
				email,
				username,
				password: hashed,
				profile: {
					create: {
						fullName,
						phone,
					},
				},
			},
		})

		const token = generateJwt(createdUser.username)
		return sendDataResponse(res, 200, token)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

export async function getAllUsers(req, res) {}

export async function getUserByUsername(req, res) {
	const { username } = req.params

	try {
		const foundUser = await dbClient.user.findUnique({
			where: { username },
			select: {
				email: true,
				username: true,
				role: true,
				profile: {
					select: {
						fullName: true,
						phone: true,
						address: true,
						country: true,
						imgUrl: true,
					},
				},
			},
		})

		if (!foundUser) {
			const notFound = new NotFoundError("user", "username")
			return sendMessageResponse(res, notFound.code, notFound.message)
		}

		sendDataResponse(res, 200, foundUser)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}
