const router = require('express').Router();

const { authenticate, authorize } = require('../middleware/auth.middleware');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/user.controller');

router.get('/', authenticate, getUsers);
router.get('/me', authenticate, getCurrentUser);
router.patch('/me', authenticate, updateCurrentUser);

router.get('/:id', authenticate, getUser);

router.post('/', authenticate, authorize('owner'), createUser);

router.patch('/:id', authenticate, authorize('owner'), updateUser);

router.delete('/:id', authenticate, authorize('owner'), deleteUser);

module.exports = router;
