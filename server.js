var express = require('express');
var app = express();

// Heroku passes a port # as an environment var
const PORT = process.env.PORT || 3000;
process.env.PWD = process.cwd()

app.use(express.static('dist'));
app.use(express.static(process.env.PWD + '/static'));

app.listen(PORT, function() {
    console.log('listening on port ' + PORT);
});
