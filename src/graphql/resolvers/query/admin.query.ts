import { adminController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrapper.utils';

const admin = {
	adminLoggedIn: graphqlWrapper(adminController.loggedIn),
};

export default admin;
