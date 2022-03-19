let { stock } = require("./models")

module.exports = {

    addEditStock: async (req, res) => {
        if (req.params.id === undefined) {
            let result = stock.add(req.body);
            res.sendStatus(result ? 200 : 503);
        } else {
            let result = stock.updateOne(req.params.id, req.body);
            res.sendStatus(result ? 200 : 503);
        }
    },

    listStock: async (req, res) => {
        let result = await stock.getAll();
        res.json(result)
    },

    getStockById: async (req, res) => {
        let result = await stock.getOne(req.params.id);
        res.json(result);
    },

    deleteStockById: async (req, res) => {
        let result = await stock.deleteOne(req.params.id);
        res.json(result);
    }

};