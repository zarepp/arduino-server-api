const admin = require("firebase-admin");
const NotificationService = require('../services/Notifications');

module.exports = {
  findAll: (req, res) => {
    const ref = admin.database().ref('users');
    ref.on('value', (snapshot) => {
      const users = snapshot.val();
      const usersArray = Object.keys(users).map(i => users[i])
      return res.json(usersArray);
    });
  },

  create: (req, res) => {
    // query status from database
    // if status changed..no need send notification

    const ref = admin.database().ref('users').push();
    
    const users = {
      id: ref.getKey(),
      arduinoId: req.body.arduinoId,
      userName: req.body.userName,
      deviceToken: req.body.deviceToken,
    };

    ref.set(users);

    const response = {
      message: 'created',
      status: '201'
    }
    return res.json(response);
  },

  upsert: (req, res) => {
    // if (!req.body.text || req.body.text.length < 3) return res.status(400).send('text is required and should be minimum 3 character');
    
    // const user = users.find(c => c.id === parseInt(req.params.id));
    // if (!user) return res.status(404).send('The user with the give ID not found');

    // user.text = req.body.text;

    const response = {
      message: 'updated',
      status: '200'
    }
  
    return res.json(response);
  },
}


