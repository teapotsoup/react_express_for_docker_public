const express = require("express");
const router = express.Router();

const diagramData = {
    nodeDataArray: [
        {key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0'},
        {key: 1, text: 'Beta', color: 'orange', loc: '150 0'},
        {key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150'},
        {key: 3, text: 'Delta', color: 'pink', loc: '150 150'}
    ], linkDataArray: [
        {key: -1, from: 0, to: 1},
        {key: -2, from: 0, to: 2},
        {key: -3, from: 1, to: 1},
        {key: -4, from: 2, to: 3},
        {key: -5, from: 3, to: 0}
    ]
};

router.get("/", (req, res) => {
    res.send(diagramData);
});

module.exports = router;