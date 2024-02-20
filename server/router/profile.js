const express = require("express");
const router = express.Router();

const profileData = {
    message: 'joji',
};

router.get("/", (req, res) => {
    res.send(profileData);
});

module.exports = router;