export class HttpError extends Error {
	public status!: number;
}

export class NotFound extends HttpError {
	constructor(message: string = 'not found') {
		super(message);
		this.status = 404;
	}
}

export class BadRequest extends HttpError {
	constructor(message: string = 'bad request') {
		super(message);
		this.status = 400;
	}
}

export class ConflictError extends HttpError {
	constructor(message: string = 'conflict error') {
		super(message);
		this.status = 409;
	}
}

export class NotAuthorized extends HttpError {
	constructor(message: string = 'not authorized') {
		super(message);
		this.status = 422;
	}
}

export class NotAuthenticated extends HttpError {
	constructor(message: string = 'not authenticated') {
		super(message);
		this.status = 401;
	}
}
