import { Controller } from '../../../types/wrapper.types';
import { GENDER_OPTIONS } from '../../../utils/constants.utils';

export const getGenderOptions: Controller<null, object, string[]> = () => {
	const result: string[] = GENDER_OPTIONS;
	return result;
};

export default getGenderOptions;
