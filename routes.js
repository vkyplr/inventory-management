const router = require("express").Router();

router.get("/", (req, res) => res.send("/static/index.html"));

module.exports = router;