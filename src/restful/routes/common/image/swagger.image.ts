/**
 * @openapi
 * tags:
 *   name: File_Uploads
 *   description: The common APIs for images
 */

/**
 * @openapi
 * /api/common/image:
 *   post:
 *     summary: Returns path name of the uploaded file
 *     tags: [File_Uploads]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               uploadedFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: filepath inside of a path property
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 path:
 *                   type: string
 *                   description: path of the uploaded file
 *                   example: temp/uuid-file-name.ext
 */

/**
 * @openapi
 * /api/common/image:
 *   get:
 *     summary: Returns File Buffer
 *     tags: [File_Uploads]
 *     parameters:
 *       - in: query
 *         name: filename
 *         schema:
 *           type: string
 *           required: true
 *           description: The path of the file
 *         example: temp/uuid-merchant-dashboard-1.png
 *     responses:
 *       200:
 *         description: file buffer according path name
 */

/**
 * @openapi
 * /api/common/image:
 *   delete:
 *     summary: Returns deleted file confirmation
 *     tags: [File_Uploads]
 *     parameters:
 *       - in: query
 *         name: filename
 *         schema:
 *           type: string
 *           required: true
 *           description: The path of the file
 *         example: temp/uuid-merchant-dashboard-1.png
 *     responses:
 *       200:
 *         description: confirmation of deleted file
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Image deleted successfully.
 */
