import { expect } from 'chai';
import {
	convertUnknownIntoError,
	getMillSeconds,
	getZeroTimeZone,
	includeDeleteParams,
} from '../../utils/logics.utils';
import { HttpError } from '../../utils/errors.utils';
import { changePasswordSchema } from '../../validation/index';
import { resolveGetUserType, resolveJoiValidator } from '../helper';

describe('Unit testing on logics.utils.ts file', (): void => {
	it('getMillSeconds', (): void => {
		const result = getMillSeconds();
		expect(result).to.be.a('number');
	});

	it('getZeroTimeZone', (): void => {
		const result = getZeroTimeZone();
		expect(result).to.be.a.string;
	});

	it('convertUnknownIntoError', (): void => {
		let error: any;

		error = 'string';
		let result = convertUnknownIntoError(error);
		expect(result).to.be.a.instanceOf(HttpError);

		error = '';
		result = convertUnknownIntoError(error);
		expect(result).to.be.a.instanceOf(HttpError);

		error = new Error('string');
		result = convertUnknownIntoError(error);
		expect(result).to.be.a.instanceOf(HttpError);

		error = new HttpError('string');
		result = convertUnknownIntoError(error);
		expect(result).to.be.a.instanceOf(HttpError);
	});

	it('includeDeleteParams', (): void => {
		const result = includeDeleteParams({ 'some-prop': 'some-value' });
		expect(result).to.contain({ isDeleted: false, deletedAt: null });
	});

	it('joiValidator', async (): Promise<void> => {
		let result: boolean = await resolveJoiValidator(changePasswordSchema, {});
		expect(result).to.be.false;

		result = await resolveJoiValidator(changePasswordSchema, {
			oldPassword: 'hello',
			password: 'hello1',
		});
		expect(result).to.be.false;

		result = await resolveJoiValidator(changePasswordSchema, {
			oldPassword: '123Abc456',
			password: '123aBc456',
		});
		expect(result).to.be.true;
	});

	it('getUserType', (): void => {
		let result = resolveGetUserType({ shouldAdmin: true, shouldUser: false });
		expect(result).to.deep.equal({ success: true, key: 'adminId' });

		result = resolveGetUserType({ shouldAdmin: false, shouldUser: true });
		expect(result).to.deep.equal({ success: true, key: 'userId' });

		result = resolveGetUserType({ shouldAdmin: false, shouldUser: false });
		expect(result).to.deep.equal({ success: false });

		result = resolveGetUserType({ shouldAdmin: true, shouldUser: true });
		expect(result).to.deep.equal({ success: false });
	});
});
