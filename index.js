// import path
const path = require("path");
// import multer
const multer = require("multer");
// import express
const express = require("express");
// use express
const app = express();
// port
const port = 3000;
// file location
const upload_folder = "./uploads";
// stroge
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, upload_folder);
  },
  filename: (req, file, cb) => {
    // important file pdf => importantfile -4324324
    const fileExt = path.extname(file.originalname);
    const filename =
      file.originalname.replace(fileExt, "").toLowerCase().split(" -") +
      "_" +
      Date.now();
 
    cb(null, filename + fileExt);
  },
});

// multer upload object
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, //1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        //
        cb(new Error("only jpg png jpeg allow "));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("only pdf allowed!!"));
      }
    } else {
      cb(new Error("there was an unknown error"));
    }
  },
});

// error handeler

app.use((err, req, res, next) => {
  if (err) {
    // multer error
    if (err instanceof multer.MulterError) {
      res.status(500).send("there was an upload error");
    } else {
      res.status | (500).send(err.message);
    }
  } else {
    res.status(500).send("success");
  }
});

// application router
app.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "doc", maxCount: 2 },
  ]),
  (req, res) => {
      console.log(req.files);
      res.send("Hello World!");
  }
);

// app.post("/", upload.single("avatar"), (req, res) => {
//   res.send("Hello World!");
// });

// server run
app.listen(port, () => console.log(`Example app listening on port port!`));
