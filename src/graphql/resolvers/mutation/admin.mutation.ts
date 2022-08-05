import { adminController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrapper.utils';

const admin = {
	adminLogin: graphqlWrapper(adminController.login),
	adminChangePassword: graphqlWrapper(adminController.changePassword),
};

export default admin;
