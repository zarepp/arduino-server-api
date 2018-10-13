// const Joi = require('joi');
const functions = require('firebase-functions');
const express = require('express');

// Routes
const routesApi = require('./src/routes/api/courses');
const routesNotesApi = require('./src/routes/api/notes');

// Authorization
const admin = require("firebase-admin");
// const  serviceAccount = require("./to-do-app-api-firebase-adminsdk-t5bbj-cf9bdec6c5.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://to-do-app-api.firebaseio.com"
// });

const app = express();
app.use(express.json());

// Routes
app.get('/home', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.send('Hello World');
});
app.use('/api', routesApi);
app.use('/api', routesNotesApi);

// App listen or serve
app.listen(3000, () => console.log('Listening on port 3000'));

exports.app = functions.https.onRequest(app);
