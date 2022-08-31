import { Admin } from '@prisma/client';
import { compareSync, encodePayload, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthenticated } from '../../utils/errors.utils';
import {
	getSessionEndsAt,
	getZeroTimeZone,
	joiValidator,
	omitProps,
} from '../../utils/logics.utils';
import { adminLoginSchema } from '../../validation';

type Args = {
	username: string;
	password: string;
};

type Result = {
	token: string;
	payload: Partial<Admin>;
};

const notAuthenticated: string = 'username or password is incorrect';

export const adminLogin: Controller<null, Args, Result> = async (root, args) => {
	await joiValidator(adminLoginSchema, args);

	const { username, password } = args;

	const admin = await prisma.admin.findFirst({ where: { username } });
	if (!admin) throw new NotAuthenticated(notAuthenticated);

	const isMatch = compareSync(password, admin.password);
	if (!isMatch) throw new NotAuthenticated(notAuthenticated);

	const token = encodePayload(admin.id, 'adminId');

	const now = getZeroTimeZone();
	const endsAt = getSessionEndsAt();

	await prisma.session.upsert({
		where: { adminId: admin.id },
		update: {
			token,
			endsAt,
			updatedAt: now,
			isPublished: false,
		},
		create: {
			token,
			adminId: admin.id,
			endsAt,
			createdAt: now,
			updatedAt: now,
		},
	});

	return { token, payload: omitProps(admin) };
};
