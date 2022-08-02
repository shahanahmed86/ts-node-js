import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { KeyIds } from '../types/common.types';

interface IVerifiedUser {
	adminId?: string;
	userId?: string;
	iat: number;
	exp: number;
}

type EncodePayload = (payload: string, key: KeyIds) => string;
type DecodePayload = (token: string) => Promise<IVerifiedUser>;

export const encodePayload: EncodePayload = (payload, key) => {
	return jwt.sign({ [key]: payload }, JWT_SECRET, { expiresIn: '1h' });
};

export const decodePayload: DecodePayload = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) reject(err);

			resolve(decoded as IVerifiedUser);
		});
	});
};
