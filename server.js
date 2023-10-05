
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();





const connection = require('./database');

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  connection.query("select * from events",(err,result)=>{
    if(err){
      response.send("errr")
    }else{
      response.send(result)
    }
  })
  res.send("Uinty Yoga Studio is running");
});

//get for instructors
app.get("/api/instructors",(req, res)=>{
  const query = 'SELECT * FROM instructors';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).send('Error fetching data from MySQL');
      return;
    }

    // Send the results as a response
    res.json(results);
  
  });
 
});

//get for instructors by Id
app.get("/api/instructors/id/:id",(req, res) => {
  const instructorsId = req.params.id;
  const query = 'SELECT * FROM instructors WHERE id = ?';
  
  connection.query(query, [instructorsId], (error, results) => {
    if (error) {
      console.error('Error fetching instructors by ID: ' + error);
      res.status(500).send('Error fetching instructors by ID');
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'instructor not found' });
    } else {
      res.json(results[0]);
    }
  });
});

//get instructor by email
app.get('/api/instructors/email/:email', (req, res) => {

const email = req.params.email;

  // Perform a MySQL query to retrieve the instructor by email
  const query = 'SELECT * FROM instructors WHERE email = ?';

  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error fetching instructor by email: ' + error);
      res.status(500).send('Error fetching instructor by email');
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Instructor not found' });
    } else {
      res.json(results[0]);
    }
  });
});





//post for instructors
app.post('/api/instructors', (req, res) => {
  const newClass = req.body;
  newClass.reviews = JSON.stringify(newClass.reviews);
  newClass.social_media = JSON.stringify(newClass.social_media);
  newClass.upcoming_events = JSON.stringify(newClass.upcoming_events);

  const sql = 'INSERT INTO instructors SET ?';

  connection.query(sql, newClass, (error) => {
    
    if (error) {
      console.error('Error creating instructor:', err);
      res.status(500).json({ error: 'Error creating instructor' });
    } else {
      res.status(201).json({ message: 'instructors created successfully' });
    }
  });
});





// update instructor

app.put('/api/instructors/update/:id', (req, res) => {
  const Id = req.params.id;
  const updatedclass = req.body; 
  updatedclass.reviews = JSON.stringify(updatedclass.reviews);
  updatedclass.social_media = JSON.stringify(updatedclass.social_media);
  updatedclass.upcoming_events = JSON.stringify(updatedclass.upcoming_events);

  connection.query('UPDATE instructors SET? WHERE id = ?', [updatedclass, Id], (error, result) => {
    if (error) {
      console.error('Error updating instructor: ' + error);
      res.status(500).send('Error updating instructor');
      return;
    }

    res.status(200).json({ message: 'instructor updated successfully' });
  });
});



//delete instructors
app.delete('/api/instructors/delete/:id', (req, res) => {
  const instructorsId = req.params.id;
  const query = 'DELETE FROM instructors WHERE id = ?';
  connection.query(query, [instructorsId], (error, result) => {
    if (error) {
      console.error('Error deleting instructor: ' + error);
      res.status(500).send('Error deleting instructor');
      return;
   } 

    res.status(204).send(); // No content, successful deletion
  });
});


//get for events
app.get("/api/events",(req, res)=>{
  const query = 'SELECT * FROM events';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).send('Error fetching data from MySQL');
      return;
    }

    // Send the results as a response
    res.json(results);
  
  });
 
});

//get for events by Id
app.get("/api/events/id/:id",(req, res) => {
  const eventId = req.params.id;
  const query = 'SELECT * FROM events WHERE id = ?';
  
  connection.query(query, [eventId], (error, results) => {
    if (error) {
      console.error('Error fetching event by ID: ' + error);
      res.status(500).send('Error fetching event by ID');
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'event not found' });
    } else {
      res.json(results[0]);
    }
  });
});






//post for events
app.post('/api/events/add',(req, res)=>{
  const newClass = req.body;
  //newClass.reviews = JSON.stringify(newClass.reviews);
  //newClass.social_media = JSON.stringify(newClass.social_media);
  //newClass.upcoming_events = JSON.stringify(newClass.upcoming_events);
  const sql = 'INSERT INTO events SET ?';
  connection.query(sql, newClass, (error) => {
    if (error) {
      console.error('Error creating event ', error);
      res.status(500).json({ error: 'Error creating events' });
    } else {
      res.status(200).json({ message: 'event created successfully' });
    }
  });
});
  
//update for events
app.put('/api/events/update/:id', (req, res) => {
  const eventId = req.params.id;
  const { name, discription, date, url, image } = req.body; 

  
  const query = 'UPDATE events SET name = ?, discription = ?, date =?, url = ?, image = ? WHERE id = ?';
  connection.query(query, [name, discription, date, url, image, eventId], (error, result) => {
    if (error) {
      console.error('Error updating event: ' + error);
      res.status(500).send('Error updating event');
      return;
    }

    res.status(200).json({ message: 'event updated successfully' });
  });
});
 
 

//delete for events
app.delete('/api/events/delete/:id', (req, res) => {
  const eventId = req.params.id;
  const query = 'DELETE FROM events WHERE id = ?';
  connection.query(query, [eventId], (error, result) => {
    if (error) {
      console.error('Error deleting instructor: ' + error);
      res.status(500).send('Error deleting instructor');
      return;
    }

    res.status(204).send(); // No content, successful deletion
  });
});


//get for blogs
app.get("/api/blogs",(req, res)=>{
  const query = 'SELECT * FROM blogs';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).send('Error fetching data from MySQL');
      return;
    }

    // Send the results as a response
    res.json(results);
  
  });
 
});

//get for blogs by Id
app.get("/api/blogs/id/:id",(req, res) => {
  const blogsId = req.params.id;
  const query = 'SELECT * FROM blogs WHERE id = ?';
  
  connection.query(query, [blogsId], (error, results) => {
    if (error) {
      console.error('Error fetching blog by ID: ' + error);
      res.status(500).send('Error fetching blog by ID');
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'blog not found' });
    } else {
      res.json(results[0]);
    }
  });
});




//post for blogs
app.post('/api/blogs/add',(req, res)=>{
  const { title, discription, date, image } = req.body;

  const query = 'INSERT INTO blogs (title, discription,date,image) VALUES (?, ?, ?, ?)';
  connection.query(query, [title, discription,date,image], (error, result) => {
    if (error) {
      console.error('Error creating blog: ' + error);
      res.status(500).send('Error creating blog');
      return;
    }

    res.status(201).json({ message: 'blog created successfully', id: result.insertId });
  });
});

 //update for blogs
 app.put('/api/blogs/update/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, discription, date, image } = req.body; 

  
  const query = 'UPDATE blogs SET title = ?, discription = ?, date =?, image = ? WHERE id = ?';
  connection.query(query, [title, discription, date,image, blogId], (error, result) => {
    if (error) {
      console.error('Error updating blog: ' + error);
      res.status(500).send('Error updating blog');
      return;
    }

    res.status(200).json({ message: 'blog updated successfully' });
  });
});

//delete for blogs
app.delete('/api/blogs/delete/:id', (req, res) => {
  const blogsId = req.params.id;
  const query = 'DELETE FROM blogs WHERE id = ?';
  connection.query(query, [blogsId], (error, result) => {
    if (error) {
      console.error('Error deleting blog: ' + error);
      res.status(500).send('Error deleting blog');
      return;
    }

    res.status(204).send(); // No content, successful deletion
  });
});










app.listen(port, () => {
  console.log(`Uinty Yoga Studio is running on port ${port}`);
});
