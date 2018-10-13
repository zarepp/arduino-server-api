// const Joi = require('joi');
const functions = require('firebase-functions');
const express = require('express');

// Routes
const routesCoursesApi = require('./src/routes/api/courses');
const routesNotesApi = require('./src/routes/api/notes');
const routesTemperatureApi = require('./src/routes/api/temperature')

// Authorization
const admin = require("firebase-admin");
const serviceAccount = require("./arduino-server-api-firebase-adminsdk-epd43-d14c27d60a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arduino-server-api.firebaseio.com"
});

const app = express();
app.use(express.json());

// Routes
app.get('/home', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.send('Hello World');
});
app.use('/api', routesCoursesApi);
app.use('/api', routesNotesApi);
app.use('/api', routesTemperatureApi);

// App listen or serve
app.listen(3000, () => console.log('Listening on port 3000'));

exports.app = functions.https.onRequest(app);
