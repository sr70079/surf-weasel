const router = require('express').Router();
// const authController = require('../controllers/authController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  // Authentication
  router.post('/register', AuthController.register);
  router.post('/dashboard', AuthController.saveFavBeach);
  router.get('/dashboard', AuthController.getFavBeach);
  router.post('/login', AuthController.login);
  // router.post('/dashboard', AuthController.dashboard); // still fixing
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  // router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);
  router.get('/key', AuthController.getKey);

  return router;
};
