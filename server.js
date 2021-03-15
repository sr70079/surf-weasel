// Dependencies
const express = require('express');

// Express app setup
const app = express();
const PORT = process.env.PORT || 8080;

// Express app data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('./public'));

// api routes
require('./routes/apiRoutes')(app);

// html routes
require('./routes/htmlRoutes.js')(app);
const db = require('./models');
db.sequelize.sync().then(function () {
  app.listen(PORT, () => console.log('listening on PORT 8080'));
});
