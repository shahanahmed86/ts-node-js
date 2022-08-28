import { userController } from '../../../controllers';

const user = {
	userLogin: userController.userLogin,
	userChangePassword: userController.userChangePassword,
	userSignUp: userController.userSignUp,
};

export default user;
