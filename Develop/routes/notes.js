const express = require("express");
const notes = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

notes.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const jsonData = JSON.parse(data);
      return res.json(jsonData);
    }
  });
});

notes.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      uuid: uuidv4(),
    };

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const jsonData = JSON.parse(data);

        jsonData.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(jsonData, null,  4), (err) => {
          if (err) {
            console.error(err);
            res.json("Error in posting note");
          } else {
            const response = {
              status: "success",
              body: newNote,
            };

            res.json(response);
          }
        });
      }
    });
  }
});

module.exports = notes;
