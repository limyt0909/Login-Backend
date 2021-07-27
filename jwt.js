//https://fullmoon1344.tistory.com/77
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
app.listen(5000, () => console.log("JWT 토큰 테스트"));

app.post("/api/login", (req, res) => {
  // Mock user
  const user = { id: 1, username: "brad", email: "bread@gmail.com" };
  //사용자 정보 암호화 - sign(전달할 내용, 비밀 키, 유효시간, 콜백)
  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({ token });
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  //암호 토큰 해싱작업
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "Post created...", authData });
    }
  });
});
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1]; // 토큰 값
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
