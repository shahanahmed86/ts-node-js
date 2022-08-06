import file from '../../../library/file.library';
import { Controller } from '../../../types/wrapper.types';
import { NotFound } from '../../../utils/errors.utils';

type Result = {
	path: string;
};

export const uploadImage: Controller<null, object, Result> = async (root, args, { req }) => {
	if (!req.files) throw new NotFound('File attachment not found');

	const path = await file.localUpload(req.files);
	return { path };
};
