let { stock } = require("./models")

module.exports = {

    addEditStock: async (req, res) => {
        if (req.params.id == undefined) {
            let result = stock.add(req.body);
            res.sendStatus(result ? 200 : 503);
        } else {
            // Update Stock
        }
    },

    // listStock: async

};