module.exports = function (db) {
  return {
    // oh CRUD!!
    // Get all examples
    getExamples: function (req, res) {
      db.userinfo_db.findAll({ where: { UserId: req.session.passport.users.id } }).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Create a new example
    createExample: function (req, res) {
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
