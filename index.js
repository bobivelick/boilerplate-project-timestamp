// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:dateStr?", function(req, res) {
  const date_str = req.params.dateStr;
  let date_obj = date_str ? new Date(date_str) : new Date();
  if (isNaN(date_obj.getTime())) {
    date_obj = new Date(parseFloat(date_str));
  }
  if (isNaN(date_obj.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ "unix": date_obj.getTime(), "utc": date_obj.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
