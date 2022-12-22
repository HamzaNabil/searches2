require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const connectionString = `mongodb+srv://hamza:hamza123@cluster0.rxs3f.mongodb.net/research2_db?retryWrites=true&w=majority`;
mongoose
  .connect(process.env.MONGO_URI || connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connection done"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV == "production") {
  app.use("/", express.static("public"));
  app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));
  app.get("/searches", (req, res) =>
    res.sendFile(__dirname + "/public/searches.html")
  );
  app.get("/done", (req, res) => res.sendFile(__dirname + "/public/done.html"));
  app.get("/done_en", (req, res) =>
    res.sendFile(__dirname + "/public/done_en.html")
  );
} else {
  app.get("/", (req, res) => res.send("Api"));
}

// default options
app.use(fileUpload());

const Searches = mongoose.model(
  "searches",
  new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    jobNumber: String,
    searchTerm: String,
    scopusId: String,
    wosId: String,
    researchGateId: String,
    dp: String,
    shatr: String,
    gofMember: String,
    membersNumber: Number,
    addCoriatMembers: String,
    gofMembers: String,
    addGofMembers: String,
    magName: String,
    magPage: String,
    doi: String,
    statusPublish: String,
    dbEle: String,
    date: Date,
    mgStars: String,
    factor: String,
    citations: String,
    searchTmwil: String,
    tamwilDir: String,
    journal: String,
    editor: String,
  })
);

app.get("/api/searches", async (req, res) => {
  const searches = await Searches.find();
  res.send(searches);
});

app.post("/api/searches", async (req, res, next) => {
  try {
    const newSearch = new Searches(req.body);

    Searches.findOne(
      { searchTerm: req.body.searchTerm },
      async function (err, term) {
        if (term) {
          res.status(400).json({ error: "This search has already been used!" });
        } else {
          const saveData = await newSearch.save();
          res.send(saveData);
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});

app.post("/upload-file", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;

      file.mv(__dirname + "/uploads/" + file.name);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });

      // res.redirect("/done");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/searches/:id", async (req, res) => {
  const deletedSearch = await Searches.findByIdAndDelete(req.params.id);
  res.send(deletedSearch);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server Running ");
});
