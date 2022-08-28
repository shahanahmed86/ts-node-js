import { adminController } from '../../../controllers';

const admin = {
	adminLogin: adminController.adminLogin,
	adminChangePassword: adminController.adminChangePassword,
};

export default admin;
