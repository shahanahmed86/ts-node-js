import { commonController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrapper.utils';

const common = {
	genderOptions: graphqlWrapper(commonController.getGenderOptions),
};

export default common;
