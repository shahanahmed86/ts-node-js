import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

interface IVerifiedUser {
	adminId?: string;
	userId?: string;
	iat: number;
	exp: number;
}

type EncodePayload = (id: string, key: string) => string;
type DecodePayload = (token: string) => Promise<IVerifiedUser>;

export const encodePayload: EncodePayload = (id, key) => {
	return jwt.sign({ [key]: id }, JWT_SECRET, { expiresIn: '1h' });
};

export const decodePayload: DecodePayload = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) reject(err);

			resolve(decoded as IVerifiedUser);
		});
	});
};
