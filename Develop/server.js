// const express = require("express");
// const path = require("path");
// const api = require("./routes/index.js");

// use either environment PORT or 3001 (for testing)
// const PORT = process.env.PORT || 3001;
// const app = express();

// Middleware for parsing JSON data
// app.use(express.json());
// // Middleware for using all files in the public folder
// app.use(express.static("public"));
// // Added index.js that acts as an overall router
// app.use("/api", api);

// // GET Route for notes.html
// app.get("/notes", (req, res) =>
//   res.sendFile(path.join(__dirname, "./public/notes.html"))
// );

// // route to direct users to index.html
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "./public/index.html"))
// );

// app.listen(PORT, () => {
//   console.log(`App listening at http://localhost:${PORT}`)
// });


                        ///////////////////////////////////////
///////////////   Git branch develop start to troubleshoot server.js   ////////////
                        //////////////////////////////////////




// Required modules
const express = require("express");
// const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const app = express();

const PORT = process.env.PORT || 3001;

const notes = require("./db/db.json");

////Parses

//Parses incoming requests of string or array data
app.use(express.urlencoded({ extended: true }));
// Parses incoming JSON data
app.use(express.json());
// Middleware for using all files in the public folder
app.use(express.static("public"));

// GET Route for retrieving all saved notes and returning all saved notes as JSON. 
app.get("/api/notes", (req, res) => {
  res.json(notes);
});



// POST to receive a new note to

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuid.v1();
  notes.push(newNote);

  console.log(notes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
  res.json(notes);
});

////GET notes dir returns the notes.html file

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});


// listens for console.log
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});