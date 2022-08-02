import('dotenv/config');

import { hashSync } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);

const prisma = new PrismaClient();

const hashPassword = (salt) => hashSync(salt, BCRYPT_SALT);
const getZeroTimeZone = (value = new Date()) => value.toISOString();

(async () => {
	try {
		const username = 'shahan';

		let user = await prisma.admin.findFirst({ where: { username } });
		if (!user) {
			const now = getZeroTimeZone(),
				password = hashPassword('123Abc456'),
				createdAt = now,
				updatedAt = now;
			const data = { username, password, createdAt, updatedAt };

			user = await prisma.admin.create({ data });
		}

		console.log('prisma seeds.......... : ', user);
		return user;
	} catch (error) {
		console.error(error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
		process.exit(0);
	}
})();
