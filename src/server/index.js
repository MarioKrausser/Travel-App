const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

let projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;


// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

app.post( '/addData', addData );

function addData( req, res ) {
  console.log( "addData", req );
  projectData = {
    city: req.body.journeyInformation.city,
    country: req.body.journeyInformation.country,
  }
}



