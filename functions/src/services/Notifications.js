const admin = require("firebase-admin");
const request = require('request');
const url = "https://exp.host/--/api/v2/push/send";

// get arduino id
// query to user collection then get device token
getDeviceToken = (arduinoId) => {
  return new Promise((resolve) => {
    const refDeviceToken = admin.database().ref()
    const query = refDeviceToken.child('users').orderByChild('/arduinoId').equalTo(arduinoId);    
    query.once('value', (snapshot) => {
      const notes = snapshot.val();
      const result = Object.keys(notes).map(i => notes[i]);
      // console.log('query:', result[0].deviceToken);
      // return res.send(result);
      resolve(result[0].deviceToken);
    });
  })
}

module.exports = {
  warning: (arduinoId) => {
    getDeviceToken(arduinoId).then((deviceToken) => {
      const bodyObject = { 
        "to": deviceToken, // device token get from database
        "title": "Warning Notification",
        "body": "Get Your Car for Checkup!!"
      };
  
      return request({
          url,
          method: "POST",
          json: true,
          body: bodyObject
      }, function (error, response, body){
        if (error) {
          console.log(error)
        } else {
          console.log(body);
        }
      });
    })
  },

  danger: (arduinoId) => {
    getDeviceToken(arduinoId).then((deviceToken) => {
      const bodyObject = { 
        "to": deviceToken,
        "title": "Danger Notification",
        "body": "Stop Your Car NOW!!"
      };
  
      request({
          url,
          method: "POST",
          json: true,
          body: bodyObject
      }, function (error, response, body){
          if (error) {
            console.log(error);
          } else {
            console.log(body);
          }
      });
    })
  }
}