export type LoginType = 'LOCAL' | 'FACEBOOK' | 'GOOGLE';

export type GenderType = 'MALE' | 'FEMALE' | 'PREFER_NOT_TO_SAY';

export type KeyIds = 'userId' | 'adminId';

export interface DeleteParams {
	[key: string]: any;
	isDeleted: boolean;
	deletedAt: null;
}
export type IncludeDeleteParams = (where: object) => DeleteParams;
