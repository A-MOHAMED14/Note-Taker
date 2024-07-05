const express = require("express");
const notes = express.Router();
const fs = require("fs");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils.js");
const { v4: uuidv4 } = require("uuid");

notes.get("/", (req, res) => {
  console.info(`${req.method} request recieved for notes`);
  readFromFile("./db/db.json", "utf-8")
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to read file" });
    });
});

notes.post("/", (req, res) => {
  console.info(`${req.method} request recieved for notes`);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      uuid: uuidv4(),
    };

    readAndAppend("./db/db.json", newNote);

    const response = {
      status: "Note added successfully",
      body: newNote,
    };

    res.status(201).json(response);
  } else {
    res.json("Error in posting note");
  }
});

notes.delete("/:id", (req, res) => {
  const uuid = req.params.id;

  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const jsonData = JSON.parse(data);

      const noteIndex = jsonData.findIndex(
        (note) => note.uuid === "deca8468-e94f-41a3-8031-4fbbc2180c64"
      );

      console.log("Note to delete index position is:", noteIndex);

      jsonData.splice(noteIndex, 1);

      fs.writeFile("./db/db.json", JSON.stringify(jsonData, null, 4), (err) => {
        if (err) {
          console.error(err);
          res.json("Error deleting note");
        } else {
          const response = {
            status: "Note deleted successfully",
            body: jsonData,
          };

          res.json(response);
        }
      });
    }
  });
});

module.exports = notes;
