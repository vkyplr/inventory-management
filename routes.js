const router = require("express").Router();
const controller = require("./controller");

router.get("/", (req, res) => res.send("/static/index.html"));

router.post("/stock/:id?", controller.addEditStock);

router.get("/stock", controller.listStock);

router.get("/stock/:id", controller.getStockById);

router.get("/delete-stock/:id", controller.deleteStockById)

module.exports = router;