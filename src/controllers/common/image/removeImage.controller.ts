import file from '../../../library/file.library';
import { Controller } from '../../../types/wrapper.types';
import { NotFound } from '../../../utils/errors.utils';
import { joiValidator } from '../../../utils/logics.utils';
import { fileRef } from '../../../validation';

type Args = {
	filename: string;
};

export const removeImage: Controller<null, Args, string> = async (root, args) => {
	await joiValidator(fileRef, args);

	if (file.deleteOldFileLocally(args.filename)) return 'Image deleted successfully';
	throw new NotFound("Image has already been deleted or doesn't exists");
};
