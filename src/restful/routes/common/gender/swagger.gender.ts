/**
 * @openapi
 * tags:
 *   name: Gender_Options
 *   description: The common APIs for gender options
 */

/**
 * @openapi
 * /api/common/gender:
 *   get:
 *     summary: Returns array in string
 *     tags: [Gender_Options]
 *     responses:
 *       200:
 *         description: Gender Options
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *             example: ["MALE", "FEMALE", "PREFER_NOT_TO_SAY"]
 */
