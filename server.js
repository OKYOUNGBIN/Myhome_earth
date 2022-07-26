let PORT = 3000;

// node_modules 에 있는 express 관련 파일을 가져온다.
let express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
let app = express();
// 최상위 폴더 사용 허용
app.use(express.static("public"));
app.use(express.static("node_modules"));

// 맨 처음 화면을 intro.html로 설정
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/intro.html");
});

app.get("/main", function (req, res) {
  res.sendFile(__dirname + "/public/html/main.html");
});

app.get("/book", function (req, res) {
  res.sendFile(__dirname + "/public/html/book.html");
});

// 3000 포트로 서버 오픈
app.listen(PORT, function () {
  console.log(`START! Express server on port ${PORT}`);
});
