import fs from 'fs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../';
import * as userHelper from '../api/restful/user.helper';
import { prisma } from '../../library/prisma.library';

chai.use(chaiHttp);

export const healthcheck = () => chai.request(httpServer).get('/api/healthcheck');

export const uploadImage = (imagePath: string = './src/assets/appstore.png') => {
	return chai
		.request(httpServer)
		.post('/api/common/image')
		.set('content-type', 'multipart/form-data')
		.attach('uploadedFile', fs.readFileSync(imagePath), {
			contentType: 'image/png',
			filename: 'appstore.png',
		});
};

export const getImage = (filename: string) => {
	return chai.request(httpServer).get(`/api/common/image?filename=${filename}`);
};

export const deleteImage = (filename: string) => {
	return chai.request(httpServer).delete(`/api/common/image?filename=${filename}`);
};

export const hardDelete = async () => {
	const res = await userHelper.login();

	await prisma.signUp.delete({ where: { id: res.body.payload.id } });
	await prisma.user.delete({ where: { id: res.body.payload.user.id } });

	if (res.body.payload.avatar) await deleteImage(res.body.payload.avatar);
};
