//https://surprisecomputer.tistory.com/39

var express = require("express");
var app = express();
const port = process.env.PORT || 8080;
const indexRouter = require("./routes");

app.listen(port, () => {
  console.log(`로그인 백엔드 포트 :  ${port}`);
});

app.use("/", indexRouter);
