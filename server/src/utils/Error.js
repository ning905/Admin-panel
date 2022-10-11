export class BadRequestError {
	constructor(message = "Bad request") {
		this.code = 400
		this.message = message
	}
}

export class InvalidLoginError {
	constructor() {
		this.code = 404
		this.message = "Invalid email and/or password provided"
	}
}

export class NotFoundByIdError {
	constructor(target) {
		this.code = 404
		this.message = `The ${target} with the provided id does not exist`
	}
}

export class ServerConflictError {
	constructor(message) {
		this.code = 409
		this.message = message
	}
}

export class InternalServerError {
	constructor(message = "Internal Server Error") {
		this.code = 500
		this.message = message
	}
}
