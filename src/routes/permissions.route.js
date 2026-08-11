const router = require('express').Router();

const { authenticate } = require('../middleware/auth.middleware');
const { getPermissions } = require('../controllers/permission.controller');

router.get('/', authenticate, getPermissions);

module.exports = router;
