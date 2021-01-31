const { GOOGLE_STORAGE_URL, BUCKET_NAME } = require("../libs/Constant");

const {
  uploadBase64File,
  listFiles,
  deleteFile,
} = require("../libs/storage/index");

const fs = require("fs");
const path = require("path");

exports.list = async function (req, res, next) {
  try {
    let files = await listFiles();
    files = files
      .filter((f) => f.name.includes("."))
      .map((f) => {
        return {
          name: f.name.split("/").pop(),
          url: GOOGLE_STORAGE_URL + BUCKET_NAME + "/" + f.name,
        };
      });
    res.json({ ok: true, files: files });
  } catch (e) {
    next(e);
  }
};

exports.save = async function (req, res, next) {
  try {
    const { fileName, fileData } = req.body;
    const filePath = `assets/images/${fileName}`;
    await uploadBase64File(filePath, fileData);
    res.json({
      ok: true,
      fileName: fileName,
      url: GOOGLE_STORAGE_URL + BUCKET_NAME + filePath,
    });
  } catch (e) {
    next(e);
  }
};

exports.delete = async function (req, res, next) {
  try {
    const filePath = `assets/images/${req.params.image}`;
    deleteFile(filePath);
    let files = await listFiles();
    files = files
      .filter((f) => f.name.includes("."))
      .map((f) => {
        return {
          name: f.name.split("/").pop(),
          url: GOOGLE_STORAGE_URL + BUCKET_NAME + "/" + f.name,
        };
      });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
};
