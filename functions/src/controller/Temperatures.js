const admin = require("firebase-admin");
var request = require('request');

module.exports = {
  findAll: (req, res) => {
    const ref = admin.database().ref('temperatures');
    ref.on('value', (snapshot) => {
      const notes = snapshot.val();
      const notesArray = Object.keys(notes).map(i => notes[i])
      return res.json(notesArray);
    });
  },

  create: (req, res) => {
    // if (!req.body.text || req.body.text.length < 3) return res.status(400).send('Text is required and should be minimum 3 character');
    // if (!req.body.date) return res.status(400).send('Date is required')

    const ref = admin.database().ref('temperatures').push();
    const temperature = req.body.temperature;
    
    if (temperature > 30 && temperature < 33) {
      const bodyObject = { 
        "to": "ExponentPushToken[7bJ8PMJ6Cr7hpjwOVgdo14]",
        "title": "Warning Notification",
        "body": "Get Your Car for Checkup!!"
      };

      request({
          url: "https://exp.host/--/api/v2/push/send",
          method: "POST",
          json: true,   // <--Very important!!!
          // header: headerObject,
          body: bodyObject
      }, function (error, response, body){
          console.log(response);
      });
    } 
    
    if (temperature >= 33 ) {
      const bodyObject = { 
        "to": "ExponentPushToken[7bJ8PMJ6Cr7hpjwOVgdo14]",
        "title": "Danger Notification",
        "body": "Stop Your Car NOW!!"
      };

      request({
          url: "https://exp.host/--/api/v2/push/send",
          method: "POST",
          json: true,   // <--Very important!!!
          // header: headerObject,
          body: bodyObject
      }, function (error, response, body){
          console.log(response);
      });
    }

    const temperatures = {
      id: ref.getKey(),
      temperature: req.body.temperature,
      timestamp: Date.now(),
    };

    ref.set(temperatures);

    const response = {
      message: 'created',
      status: '201'
    }
    return res.json(response);
  },
}


