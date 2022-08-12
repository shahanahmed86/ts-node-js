import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { BASE_URL } from '../../config';
import { PrismaClient } from '@prisma/client';
import * as userHelper from '../api/restful/user.helper';

const prisma = new PrismaClient({
	datasources: { db: { url: 'mysql://root:prisma@localhost:3306/mydb' } },
});

chai.use(chaiHttp);

export const healthcheck = () => chai.request(BASE_URL).get('/api/healthcheck');

export const uploadImage = (imagePath: string = './src/assets/appstore.png') => {
	return chai
		.request(BASE_URL)
		.post('/api/common/image')
		.set('content-type', 'multipart/form-data')
		.attach('uploadedFile', fs.readFileSync(imagePath), {
			contentType: 'image/png',
			filename: 'appstore.png',
		});
};

export const getImage = (filename: string) => {
	return chai.request(BASE_URL).get(`/api/common/image?filename=${filename}`);
};

export const deleteImage = (filename: string) => {
	return chai.request(BASE_URL).delete(`/api/common/image?filename=${filename}`);
};

export const hardDelete = async () => {
	const res = await userHelper.login();

	await prisma.signUp.delete({ where: { id: res.body.payload.id } });
	await prisma.user.delete({ where: { id: res.body.payload.user.id } });

	if (res.body.payload.avatar) await deleteImage(res.body.payload.avatar);
};
