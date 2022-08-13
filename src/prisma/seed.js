/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config');

const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const hashSync = (value = '123Abc456') => bcrypt.hashSync(value, +process.env.BCRYPT_SALT);
const getZeroTimeZone = (value = new Date()) => value.toISOString();

(async () => {
	try {
		const username = 'shahan';

		let user = await prisma.admin.findFirst({ where: { username } });
		if (!user) {
			const now = getZeroTimeZone(),
				password = hashSync('123Abc456'),
				createdAt = now,
				updatedAt = now;
			const data = { username, password, createdAt, updatedAt };

			user = await prisma.admin.create({ data });
		}

		user = _.omit(user, 'password');

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
