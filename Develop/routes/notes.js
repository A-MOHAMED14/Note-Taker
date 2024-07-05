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

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(jsonData, null, 4),
          (err) => {
            if (err) {
              console.error(err);
              res.json("Error in posting note");
            } else {
              const response = {
                status: "Note added successfully",
                body: newNote,
              };

              res.json(response);
            }
          }
        );
      }
    });
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
