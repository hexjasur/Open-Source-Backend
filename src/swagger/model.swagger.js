/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6a79e167c5c1f256a545d0c4"
 *
 *         email:
 *           type: string
 *           format: email
 *           example: "hexjasur@yolnoma.uz"
 *
 *         role:
 *           type: string
 *           enum:
 *             - owner
 *             - admin
 *           example: owner
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *         avatar_url:
 *           type: string
 *           nullable: true
 *
 *         thumbnail_url:
 *           type: string
 *           nullable: true
 *
 *         display_name:
 *           type: string
 *           nullable: true
 *
 *         is_private:
 *           type: boolean
 *           example: false
 *
 *     CreateUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@yolnoma.uz"
 *
 *         password:
 *           type: string
 *           format: password
 *           example: "StrongPassword123!"
 *
 *         role:
 *           type: string
 *           enum:
 *             - owner
 *             - admin
 *
 *         avatar_url:
 *           type: string
 *
 *         thumbnail_url:
 *           type: string
 *
 *         display_name:
 *           type: string
 *
 *         is_private:
 *           type: boolean
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     summary: Update current user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               display_name:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               is_private:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated
 *       401:
 *         description: Authentication required
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6a79e167c5c1f256a545d0c4"
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Owner permission required
 */

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
