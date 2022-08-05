import { userController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrapper.utils';

const user = {
	userLoggedIn: graphqlWrapper(userController.loggedIn),
};

export default user;
