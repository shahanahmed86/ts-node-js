import { decodePayload, Prisma, prisma } from '../../library';
import { KeyIds } from '../../types/common.types';
import { IRequest } from '../../types/extends.types';
import { BadRequest, NotAuthenticated, NotAuthorized } from '../../utils/errors.utils';
import { includeDeleteParams } from '../../utils/logics.utils';

type HasToken = (req: IRequest) => string | undefined;
type ValidateToken = (req: IRequest, token: string, key: KeyIds) => Promise<string>;

const invalidSession: string = 'no session or invalid';

const hasToken: HasToken = (req) => req.headers.authorization;

const validateToken: ValidateToken = async (req, _token, key) => {
	if (!_token.includes('Bearer ')) throw new NotAuthenticated(invalidSession);

	const [, token] = _token.split(' ');

	const payload = await decodePayload(token);
	if (!payload || !(key in payload) || !('exp' in payload)) {
		throw new NotAuthenticated(invalidSession);
	}

	req[key] = payload[key];

	return payload[key] as string;
};

export const guestController = (req: IRequest) => {
	const token = hasToken(req);
	if (token) throw new BadRequest('You are already logged in');
};

export const authController = async (key: KeyIds, req: IRequest) => {
	const token = hasToken(req);
	if (!token) throw new NotAuthorized('You must be logged in');

	const id = await validateToken(req, token, key);
	switch (key) {
		case 'adminId': {
			const admin = await prisma.admin.findFirst({ where: { id } });
			if (!admin) throw new NotAuthorized();
			break;
		}
		case 'userId': {
			const where: Prisma.UserWhereInput = includeDeleteParams({ id });
			const user = await prisma.user.findFirst({ where });
			if (!user) throw new NotAuthorized();
			break;
		}
	}
};
