const admin = require("firebase-admin");
// const uuidV1 = require('uuid/v1');

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

    const temperatures = {
      id: ref.getKey(),
      temperature: req.body.temperature,
      timestamp: req.body.timestamp,
    };

    ref.set(temperatures);

    const response = {
      message: 'created',
      status: '201'
    }
    return res.json(response);
  },
}


