const express = require("express");
const router = express.Router();

const profileData = {
    message: 'joji',
    stacks:[
        { name:'seo',age:25,hobby:'running',where:'hanam'},{name:'roh',age:26,hobby:'-',where:'none'}
    ]
};

router.get("/", (req, res) => {
    res.send(profileData);
});

module.exports = router;