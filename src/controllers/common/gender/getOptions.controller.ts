import { Controller } from '../../../types/wrapper.types';
import { GENDER_OPTIONS } from '../../../utils/constants.utils';

export const genderOptions: Controller<null, object, string[]> = () => GENDER_OPTIONS;

export default genderOptions;
