export type LoginType = 'LOCAL' | 'FACEBOOK' | 'GOOGLE';

export type GenderType = 'MALE' | 'FEMALE' | 'PREFER_NOT_TO_SAY';

export type KeyIds = 'userId' | 'adminId';

export type UserTypes = {
	shouldAdmin: boolean;
	shouldUser: boolean;
};

export type GetUserType = (userTypes: UserTypes) => KeyIds;
