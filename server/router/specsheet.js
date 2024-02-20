const express = require("express");
const router = express.Router();

const specSheetData = {
    message: 'frontend',
};

router.get("/", (req, res) => {
    res.send(specSheetData);
});

module.exports = router;