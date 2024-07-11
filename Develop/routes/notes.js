const express = require("express");
const notes = express.Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils.js");

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
  console.info(`${req.method} request recieved for notes`);

  const id = req.params.id;

  readFromFile("./db/db.json", "utf-8")
    .then((data) => {
      const jsonData = JSON.parse(data);

      const noteIndex = jsonData.findIndex((note) => note.uuid === id);

      jsonData.splice(noteIndex, 1);

      return jsonData;
    })
    .then((data) => {
      writeToFile("./db/db.json", data);
      const response = {
        status: "Note deleted successfully",
        body: data,
      };

      res.json(response);
    })
    .catch((err) => {
      console.error(err);
      res.json("Error in deleting note");
    });
});

module.exports = notes;
