const express = require('express');
const path = require('path');
const axios = require('axios');
const request = require("request")

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/getRate/:foo", (req, res) => {
    var intermediate = req.url.slice(9);
  
    if (intermediate.search("!") > 0) {
      intermediate = intermediate.replace("!", "/");
      var from = intermediate.slice(67, 70);
      var to = intermediate.slice(71, 74);
      var query = 'https://openexchangerates.org/api/'+intermediate.slice(0, 66);
    }
    else{
      var from = intermediate.slice(52, 55);
      var to = intermediate.slice(56, 59);
      var query = 'https://openexchangerates.org/api/'+intermediate.slice(0, 51);
    }

    request(query, function (error, response, body) {
        if (!error) {
          var parsedBody=JSON.parse(body);
          var temp=parsedBody["rates"][to]/parsedBody["rates"][from];
          res.send({temp});
        }
      })
  });
  
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 8000;
app.listen(port);

console.log(`Backend server live on ${port}`);