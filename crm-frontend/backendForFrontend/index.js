const express = require("express");
const app = express();
const path = require("path");

const fullPatCss = path.resolve(__dirname + "/../" + "src/css");
const fullPathJs = path.resolve(__dirname + "/../" + "src");
const fullPathImg = path.resolve(__dirname + "/../" + "src/img");
const fullPathFonts = path.resolve(__dirname + "/../" + "src/fonts");

app.use("/css", express.static(fullPatCss));
app.use("/js", express.static(fullPathJs));
app.use("/img", express.static(fullPathImg));
app.use("/fonts", express.static(fullPathFonts));

const PORT = 8000;

const fullpath = path.resolve(__dirname + "/../" + "index.html");

app.get("/", function (req, res) {
  res.sendFile(fullpath);
});

app.listen(PORT, () => {
  console.log(fullpath);
  console.log(`Application listening on http://localhost:${PORT} !`);
});
