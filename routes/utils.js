function requireUser(req, res, next) {
  if (!req.user) {
    res.send({
      name: 'Missing User Error',
      message: 'You must be logged in to perform this action',
    });
  }

  next();
}

function requireAdmin(req, res, next) {
  const adminCheck = req.user.admin;

  if (!adminCheck) {
    res.send({
      name: 'Not Admin Error',
      message: 'You must be logged in as an admin to perform this action',
    });
  }

  next();
}

module.exports = {
  requireUser,
  requireAdmin,
};
