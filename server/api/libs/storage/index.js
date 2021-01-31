const Constant = require("../Constant");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const fs = require("fs");

const storage = new Storage({
  keyFilename: path.resolve(__dirname, "./keys/google-service-account-key.json"),
});

const uploadFile = async (filePath, filename, bucket = Constant.BUCKET_NAME, metadata = {}) => {
  await storage.bucket(bucket).upload(filePath, {
    destination: filename,
    gzip: true,
    metadata: {
      cacheControl: "no-cache",
      ...metadata,
    },
  });
};

const uploadBase64File = async (filename, data, bucket = Constant.BUCKET_NAME) => {
  if (!data.includes("data:image")) {
    throw new Error("Data to save should have base64 string format");
  }

  let newBase64 = data.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, "");

  const lastPart = filename.split("/").pop();
  const filePath = path.join(Constant.UPLOADS_TEMP_DIR, lastPart);
  await writeFile(filePath, newBase64);

  await storage.bucket(bucket).upload(filePath, {
    destination: filename,
    metadata: {
      cacheControl: "no-cache",
    },
    gzip: true,
  });

  fs.unlinkSync(filePath);
};

const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, "base64", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const deleteFile = async (filename, bucket = Constant.BUCKET_NAME) => {
  return await storage.bucket(bucket).file(filename).delete();
};

const copyFile = async (srcFilename, destFilename, bucket = Constant.BUCKET_NAME) => {
  return await storage.bucket(bucket).file(srcFilename).copy(storage.bucket(bucket).file(destFilename));
};

const listFiles = async () => {
  const files = await storage.bucket(Constant.BUCKET_NAME).getFiles({ prefix: "assets/images" });
  return files[0];
};
module.exports = {
  uploadFile,
  uploadBase64File,
  deleteFile,
  copyFile,
  listFiles,
};
