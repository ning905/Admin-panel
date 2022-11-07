import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dbClient from "../utils/dbClient.js"
import {
	NoAccessError,
	NotFoundError,
	ServerConflictError,
} from "../utils/Error.js"
import { sendMessageResponse } from "../utils/serverResponse.js"

export async function validateCredentials(user, password) {
	if (!user) {
		return false
	}

	if (!password) {
		return false
	}

	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) {
		return false
	}

	return true
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = process.env.JWT_EXPIRY

export function generateJwt(username) {
	return jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRY })
}

async function validateUnique(field, data, res) {
	const found = await dbClient.user.findUnique({ where: { [field]: data } })
	if (found) {
		const inUse = new ServerConflictError(
			field.slice(0, 1).toUpperCase() + field.slice(1) + " already in use"
		)
		return sendMessageResponse(res, inUse.code, inUse.message)
	}
}

const saltRounds = 8
export async function createUserInDB(req, res) {
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

	validateUnique("email", email, res)
	validateUnique("username", username, res)

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
			id: true,
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

export async function updateUserInDB(req, res) {
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

	const foundUser = await dbClient.user.findUnique({
		where: { username: req.params.username },
	})

	if (!foundUser) {
		const notFound = new NotFoundError("user", "username")
		return sendMessageResponse(res, notFound.code, notFound.message)
	}
	if (foundUser.id !== req.user.id && req.user.role !== "ADMIN") {
		const noAccess = new NoAccessError("Only admins can access")
		return sendMessageResponse(res, noAccess.code, noAccess.message)
	}

	if (email !== foundUser.email) {
		validateUnique("email", email, res)
	}
	if (username !== foundUser.username) {
		validateUnique("username", username, res)
	}

	let hashed
	if (password) {
		hashed = await bcrypt.hash(password, saltRounds)
	}

	const updated = await dbClient.user.update({
		where: { username: req.params.username },
		data: {
			email,
			username,
			password: hashed,
			profile: {
				update: {
					fullName,
					phone,
					address,
					country,
					imgUrl,
				},
			},
		},
		select: {
			id: true,
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

	return updated
}
