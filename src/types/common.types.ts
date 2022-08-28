export { Gender as GenderType, LoginType } from '@prisma/client';

export type KeyIds = 'userId' | 'adminId';

export type UserTypes = {
	shouldAdmin: boolean;
	shouldUser: boolean;
};

export type GetUserType = (userTypes: UserTypes) => KeyIds;
