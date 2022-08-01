export class HttpError extends Error {
	public status!: number;
}

export class BadRequest extends HttpError {
	constructor(message: string = 'Bad Request') {
		super(message);
		this.status = 400;
	}
}

export class ConflictError extends HttpError {
	constructor(message: string = 'Conflict Error') {
		super(message);
		this.status = 409;
	}
}

export class NotAuthorized extends HttpError {
	constructor(message: string = 'Not Authorized') {
		super(message);
		this.status = 422;
	}
}

export class NotAuthenticated extends HttpError {
	constructor(message: string = 'Not Authenticated') {
		super(message);
		this.status = 401;
	}
}
