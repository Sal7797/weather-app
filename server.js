// Setup empty JS object to act as endpoint for all routes
projectData = {};

//Global Variables


// requestuire Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Server
const server = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`); // Callback to debug
});

const postWeather = (request, result) => {
    projectData['temp'] = request.body.temp;
    projectData['date'] = request.body.date;
    projectData['content'] = request.body.content;
    result.send(projectData);
};

const sendProjectData = (request, result) => {
    result.send(projectData);
};

app.get('/all', sendProjectData);
app.post('/add', postWeather);
  