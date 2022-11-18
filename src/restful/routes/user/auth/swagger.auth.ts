/**
 * @openapi
 * components:
 *   schemas:
 *     SignUp_User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *           example: uuid
 *         type:
 *           type: string
 *           description: Login type of the user
 *           example: LOCAL
 *         username:
 *           type: string
 *           description: Username of the user
 *           example: shahan
 *         avatar:
 *           type: string
 *           description: Avatar url path of the user
 *           example: uuid-filename.ext
 *         fullName:
 *           type: string
 *           description: Full name of the user
 *           example: Shahan Ahmed Khan
 *         email:
 *           type: string
 *           description: Email address of the user
 *           example: shahan.khaan@gmail.com
 *         gender:
 *           type: string
 *           description: Gender of the user
 *           example: MALE|FEMALE|PREFER_NOT_TO_SAY
 *         userId:
 *           type: string
 *           description: User ID of the user
 *           example: uuid
 *         User:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: User ID of the user
 *               example: uuid
 *             defaultLogin:
 *               type: string
 *               description: Default login type of the user
 *               example: LOCAL
 *             createdAt:
 *               type: string
 *               description: The created date & time of the user
 *               example: 2022-01-29T21:30:00.0000Z
 *             updatedAt:
 *               type: string
 *               description: The updated date & time of the user
 *               example: 2022-01-31T12:00:00.0000Z
 *         createdAt:
 *           type: string
 *           description: The created date & time of the user
 *           example: 2022-01-29T21:30:00.0000Z
 *         updatedAt:
 *           type: string
 *           description: The updated date & time of the user
 *           example: 2022-01-31T12:00:00.0000Z
 */

/**
 * @openapi
 * tags:
 *   name: User_Authentications
 *   description: The Authentication APIs
 */

/**
 * @openapi
 * /api/user/auth:
 *   get:
 *     summary: Returns logged in user
 *     tags: [User_Authentications]
 *     responses:
 *       200:
 *         description: Logged In
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUp_User'
 */

/**
 * @openapi
 * /api/user/auth:
 *   post:
 *     summary: Returns token and user's payload
 *     tags: [User_Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *                 example: shahan
 *               password:
 *                 type: string
 *                 description: password
 *                 example: 123Abc456
 *     responses:
 *       200:
 *         description: Login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token to include in headers
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..........9TaqCIfHvkFAtA5vLbvvmcR8Z8ttq_Wxs4vMCsfvoZw
 *                 user:
 *                   allOf:
 *                     - type: object
 *                     - $ref: '#/components/schemas/SignUp_User'
 */

/**
 * @openapi
 * /api/user/auth:
 *   put:
 *     summary: Returns change password success message
 *     tags: [User_Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: old password
 *                 example: 123Abc456
 *               password:
 *                 type: string
 *                 description: new password
 *                 example: 123456Abc
 *     responses:
 *       200:
 *         description: Change password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Password changed successfully
 */
