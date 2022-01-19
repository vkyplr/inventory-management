const router = require("express").Router();
const controller = require("./controller");

router.get("/", (req, res) => res.send("/static/index.html"));

router.post("/stock/:id?", controller.addEditStock);

router.get("/stock", controller.listStock)

module.exports = router;