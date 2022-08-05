import { userController } from '../../../controllers';
import { graphqlWrapper } from '../../../utils/wrapper.utils';

const user = {
	userLogin: graphqlWrapper(userController.login),
	userChangePassword: graphqlWrapper(userController.changePassword),
	userSignUp: graphqlWrapper(userController.register),
};

export default user;
