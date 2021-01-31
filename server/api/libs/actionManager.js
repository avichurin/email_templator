const fs = require("fs");
const path = require("path");

const readDocs = (way) => {
  return fs.readdirSync(way);
};

const saveDoc = (fileName, content) => {
  fs.writeFileSync(`./documents/${fileName}`, content);
};

const readDoc = (fileName) => {
  let document = fs.readFileSync(path.resolve(__dirname, `../../documents/${fileName}`), "utf8");
  return document;
};

const deleteDoc = (fileName) => {
  fs.unlinkSync(path.resolve(__dirname, `../../documents/${fileName}`));
};

module.exports = { readDocs, saveDoc, readDoc, deleteDoc };
