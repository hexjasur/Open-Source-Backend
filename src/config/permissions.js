const ROLE_PERMISSIONS = {
  owner: [
    'dashboard',
    'bg-remover',
    'steam-idler',
    'performances',
    'videos',
    'users',
    'settings',
    'profile',
  ],
  admin: [
    'dashboard',
    'bg-remover',
    'steam-idler',
    'videos',
    'users',
    'settings',
    'profile',
  ],
  user: ['dashboard', 'bg-remover', 'videos', 'settings', 'profile'],
};

const PAGE_ROLES = Object.keys(ROLE_PERMISSIONS).reduce((acc, role) => {
  ROLE_PERMISSIONS[role].forEach((page) => {
    if (!acc[page]) acc[page] = [];
    acc[page].push(role);
  });
  return acc;
}, {});

const getAllowedPages = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

const canAccessPage = (role, page) => {
  if (!role) return false;
  if (role === 'owner') return true;
  return Boolean(page && PAGE_ROLES[page]?.includes(role));
};

module.exports = {
  ROLE_PERMISSIONS,
  PAGE_ROLES,
  getAllowedPages,
  canAccessPage,
};
