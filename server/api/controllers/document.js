const {
  saveDoc,
  readDocs,
  readDoc,
  deleteDoc,
} = require("../libs/actionManager");

const fs = require("fs");
const path = require("path");

exports.list = async function (req, res, next) {
  try {
    const files = readDocs(path.resolve(__dirname, "../../documents"));
    res.json({ ok: true, files: files });
  } catch (e) {
    next(e);
  }
};

exports.save = async function (req, res, next) {
  try {
    let { name, type, content } = req.body;
    let docName;

    if (name === "styles.css") {
      docName = name;
    } else if (name === "strings.json") {
      docName = name;
      let string = readDoc(docName);
      let strings = JSON.parse(string);
      content = JSON.stringify({ ...strings, ...content });
    } else {
      docName = `${name}.${type}.mustache`;
    }

    saveDoc(docName, content !== undefined ? content : "Create new content");
    res.json({ ok: true, name: docName, content: content });
  } catch (e) {
    next(e);
  }
};
exports.read = async function (req, res, next) {
  try {
    const content = readDoc(req.params.document);
    res.json({
      ok: true,
      docName: req.params.document,
      content: content,
    });
  } catch (e) {
    next(e);
  }
};

exports.delete = async function (req, res, next) {
  try {
    deleteDoc(req.params.document);
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
};
