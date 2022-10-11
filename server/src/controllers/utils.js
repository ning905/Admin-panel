import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
