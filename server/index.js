// server/index.js
// 서버 수정본
const express = require('express');
const path = require('path')
const app = express();

const cors = require('cors');

const port = 3001;

app.use(express.static('public'));

// Express 애플리케이션에 "dist" 디렉토리의 정적 파일을 제공하는 미들웨어를 등록합니다.
app.use(express.static(path.join(__dirname, "../dist")));

app.use(cors());

const profileRouter = require("./router/profile");
const specSheetRouter = require("./router/specsheet");
const diagramRouter = require("./router/diagram");



app.use("/app/profileData", profileRouter);
app.use("/app/specSheetData", specSheetRouter);
app.use("/app/diagramData", diagramRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index'))
})
