import express from 'express';
import * as path from 'path';

const app = express();

const pathSrc: string = path.resolve(__dirname + "/../" + "src");

app.use("/src", express.static(pathSrc));

const PORT: number = 8000;

const pathHtml: string = path.resolve(__dirname + "/../" + "index.html");
console.log(pathHtml);


app.get("/", function (req: any, res: any) {
  res.sendFile(pathHtml);
});

app.listen(PORT, () => {
  console.log(`Application listening on http://localhost:${PORT} !`);
});