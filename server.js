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
// require('./routes/apiRoutes.js')(app);

// html routes
require('./routes/htmlRoutes.js')(app);

app.listen(PORT, () => console.log('listening on PORT 8080'));
