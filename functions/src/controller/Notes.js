const admin = require("firebase-admin");

module.exports = {
  findAll: (req, res) => {
    const ref = admin.database().ref('notes');
    ref.on('value', (snapshot) => {
      const notes = snapshot.val();
      const notesArray = Object.keys(notes).map(i => notes[i])
      return res.json(notesArray);
    });
  },

  find: (req, res) => {
    const ref = admin.database().ref('/notes/' + req.params.id);    
    ref.once('value', (snapshot) => {
      const result = snapshot.val();
      return res.send(result);
    });
  },

  create: (req, res) => {
    if (!req.body.text || req.body.text.length < 3) return res.status(400).send('Text is required and should be minimum 3 character'); 
    if (!req.body.date) return res.status(400).send('Date is required')
    
    const note = {
      text: req.body.text,
      date: req.body.date,
    };

    const ref = admin.database().ref('notes');
    ref.push(note);
    
    const response = {
      message: 'created',
      status: '201'
    }
    return res.json(response);
  },

  // upsert: (req, res) => {
  //   if (!req.body.text || req.body.text.length < 3) return res.status(400).send('text is required and should be minimum 3 character');
    
  //   const course = courses.find(c => c.id === parseInt(req.params.id));
  //   if (!course) return res.status(404).send('The course with the give ID not found');

  //   course.text = req.body.text;
  //   return res.send(course);
  // },

  delete: (req, res) => {
    const ref = admin.database().ref('/notes/' + req.params.id);    
    ref.remove();
    // const msg = { message: 'success'}
    return res.status(200).send({ message: 'success'});
  },
}
  
  
  