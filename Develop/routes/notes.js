const express = require("express");
const router = express.Router();
const fs = require("fs/promises");

router.get("/", (req, res) => {
  fs.readFile("../db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const jsonData = JSON.parse(data);
      return res.json(jsonData);
    }
  });
});
