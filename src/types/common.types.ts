export type LoginType = 'LOCAL' | 'FACEBOOK' | 'GOOGLE';

export type KeyIds = 'userId' | 'adminId';

export interface DeleteParams {
	[key: string]: any;
	isDeleted: boolean;
	deletedAt: null;
}
export type IncludeDeleteParams = (where: object) => DeleteParams;
