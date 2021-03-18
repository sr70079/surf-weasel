module.exports = function (db) {
  return {
    // oh CRUD!!
    // look through all users for a matching email and password, when the user tries to login
    getUser: function (req, res) {
      db.userinfo_db.findAll({ where: { UserId: req.session.passport.users.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // when a new user creates a login page
    createUser: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    }
  };
};
