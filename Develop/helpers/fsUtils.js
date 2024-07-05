const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = function (filePath, content) {
  fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) => {
    err ? console.error(err) : console.info(`Data written to ${filePath}`);
  });
};

const readAndAppend = function (filePath, content) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(filePath, parsedData);
    }
  });
};

module.exports = { readFromFile, readAndAppend };

// fs.readFile("./db/db.json", "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const jsonData = JSON.parse(data);

//     jsonData.push(newNote);

//     fs.writeFile(
//       "./db/db.json",
//       JSON.stringify(jsonData, null, 4),
//       (err) => {
//         if (err) {
//           console.error(err);
//           res.json("Error in posting note");
//         } else {
//           const response = {
//             status: "Note added successfully",
//             body: newNote,
//           };

//           res.json(response);
//         }
//       }
//     );
//   }
// });
