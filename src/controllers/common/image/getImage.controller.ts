import file from '../../../library/file.library';
import { Controller } from '../../../types/wrapper.types';
import { joiValidator } from '../../../utils/logics.utils';
import { fileRef } from '../../../validation';

type Args = {
	filename: string;
};

export const getImage: Controller<null, Args, string> = async (root, args) => {
	await joiValidator(fileRef, args);

	return file.getFilePath(args.filename);
};

export default getImage;
