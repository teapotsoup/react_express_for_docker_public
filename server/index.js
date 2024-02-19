// server/index.js
// 서버 수정본
const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
const port = 3001;

// Express 애플리케이션에 "dist" 디렉토리의 정적 파일을 제공하는 미들웨어를 등록합니다.
app.use(express.static(path.join(__dirname, "../dist")));

// 예시 데이터
const profileData = {
    message: 'joji',
};

const specSheetData = {
    message: 'frontend',
};

app.use(cors());

console.log('express');

app.get('/app/profileData', (req, res) => {
    res.send(profileData);
});

app.get('/app/specSheetData', (req, res) => {
    res.send(specSheetData);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    console.log("3001");
    res.sendFile(path.join(__dirname, '../index'))
})
