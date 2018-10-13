const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'coursdfgdfe2' },
  { id: 3, name: 'course3' },
  { id: 4, name: 'course4' },
];

module.exports = {
  findAll: (req, res) => {
    return res.send(courses);
  },

  find: (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the give ID not found');
    return res.send(course);
  },

  create: (req, res) => {
    if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is required and should be minimum 3 character');
    
    const course = {
      id: courses.length + 1,
      name: req.body.name
    };
    courses.push(course);
    return res.send(course);
  },

  upsert: (req, res) => {
    if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is required and should be minimum 3 character');
    
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the give ID not found');

    course.name = req.body.name;
    return res.send(course);
  },

  delete: (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the give ID not found');
    
    const idx = courses.indexOf(course);
    courses.splice(idx, 1);
    
    return res.send(course);
  },
}


