import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth.config';
import { KeyIds } from '../types/common.types';
import { EXPIRES_IN_SECONDS } from '../utils/constants.utils';

interface IVerifiedUser {
	adminId?: string;
	userId?: string;
	iat: number;
	exp: number;
}

type EncodePayload = (payload: string, key: KeyIds, expiresIn?: string | number) => string;
type DecodePayload = (token: string) => Promise<IVerifiedUser>;

export const encodePayload: EncodePayload = (payload, key, expiresIn = EXPIRES_IN_SECONDS) => {
	return jwt.sign({ [key]: payload }, JWT_SECRET, { expiresIn });
};

export const decodePayload: DecodePayload = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) reject(err);

			resolve(decoded as IVerifiedUser);
		});
	});
};
