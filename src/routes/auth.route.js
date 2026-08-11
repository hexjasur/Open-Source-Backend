const router = require('express').Router();

const {
  login,
  refresh,
  getProfile,
} = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/login', login);
router.post('/refresh', refresh);
router.get('/me', authenticate, getProfile);

module.exports = router;
