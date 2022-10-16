import dbClient from "../utils/dbClient.js"
import {
	BadRequestError,
	InternalServerError,
	InvalidLoginError,
	NoAccessError,
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
		const foundUser = await dbClient.user.findUnique({
			where: { email },
			select: {
				email: true,
				username: true,
				password: true,
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
			return sendMessageResponse(res, invalidLogin.code, invalidLogin.message)
		}

		const passwordIsValid = await validateCredentials(foundUser, password)
		if (!passwordIsValid) {
			return sendMessageResponse(res, invalidLogin.code, invalidLogin.message)
		}

		const token = generateJwt(foundUser.username)
		delete foundUser.password

		return sendDataResponse(res, 200, { token, user: foundUser })
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

async function createUserInDB(req, res) {
	const {
		email,
		username,
		password,
		fullName,
		phone,
		address,
		country,
		imgUrl,
	} = req.body

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
					address,
					country,
					imgUrl,
				},
			},
		},
		select: {
			email: true,
			username: true,
			role: true,
			profile: {
				select: {
					fullName: true,
					phone: true,
				},
			},
		},
	})

	return createdUser
}

export async function signUp(req, res) {
	try {
		const createdUser = await createUserInDB(req, res)
		const token = generateJwt(createdUser.username)
		return sendDataResponse(res, 201, { token, user: createdUser })
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

export async function getAllUsers(req, res) {
	if (req.user.role !== "ADMIN") {
		const noAccess = new NoAccessError("Only admins can access")
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}

	try {
		const users = await dbClient.user.findMany({
			select: {
				id: true,
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

		return sendDataResponse(res, 200, users)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

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

		return sendDataResponse(res, 200, foundUser)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

export async function deleteUserById(req, res) {
	if (req.user.role !== "ADMIN") {
		const noAccess = new NoAccessError("Only admins can access")
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}

	const id = req.params.id
	const foundUser = await dbClient.user.findUnique({ where: { id } })
	if (!foundUser) {
		const notFound = new NotFoundError("user", "id")
		return sendMessageResponse(res, notFound.code, notFound.message)
	}

	try {
		const deletedUser = await dbClient.user.delete({ where: { id } })
		return sendDataResponse(res, 200, deletedUser)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}

export async function createUser(req, res) {
	try {
		const createdUser = await createUserInDB(req, res)
		delete createdUser.password
		return sendDataResponse(res, 201, createdUser)
	} catch (err) {
		sendMessageResponse(res, serverError.code, serverError.message)
		throw err
	}
}
