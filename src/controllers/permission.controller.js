const { getAllowedPages, PAGE_ROLES } = require('../config/permissions');

const getPermissions = (req, res) => {
  res.json({
    success: true,
    data: {
      role: req.user.role,
      allowed_pages: getAllowedPages(req.user.role),
      page_roles: PAGE_ROLES,
    },
  });
};

module.exports = {
  getPermissions,
};
