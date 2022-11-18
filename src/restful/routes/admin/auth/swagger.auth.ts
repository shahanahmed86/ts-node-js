/**
 * @openapi
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *           example: uuid
 *         username:
 *           type: string
 *           description: username of the admin
 *           example: shahan
 *         password:
 *           type: string
 *           description: password of the admin
 *           example: 123Abc456
 *         createdAt:
 *           type: string
 *           description: The created date & time of the admin
 *           example: 2022-01-29T21:30:00.0000Z
 *         updatedAt:
 *           type: string
 *           description: The updated date & time of the admin
 *           example: 2022-01-31T12:00:00.0000Z
 */

/**
 * @openapi
 * tags:
 *   name: Admin_Authentications
 *   description: The Authentication APIs
 */

/**
 * @openapi
 * /api/admin/auth:
 *   get:
 *     summary: Returns logged in admin
 *     tags: [Admin_Authentications]
 *     responses:
 *       200:
 *         description: Logged In
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 */

/**
 * @openapi
 * /api/admin/auth:
 *   post:
 *     summary: Returns token and admin's payload
 *     tags: [Admin_Authentications]
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
 *                 admin:
 *                   allOf:
 *                     - type: object
 *                     - $ref: '#/components/schemas/Admin'
 */

/**
 * @openapi
 * /api/admin/auth:
 *   put:
 *     summary: Returns change password success message
 *     tags: [Admin_Authentications]
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
