const sqlite3 = require("sqlite3").verbose();
const path = require("path")
const db_name = path.join(__dirname, "data", "inventory.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database 'inventory.db'");
});

const sql_create_stock = `CREATE TABLE IF NOT EXISTS stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(255) NOT NULL,
    cost_price INTEGER NOT NULL,
    sale_price INTEGER NOT NULL,
    expiry_date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP  NOT NULL  DEFAULT CURRENT_TIMESTAMP
);`;

db.run(sql_create_stock, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Stock' table");
});

const stock = {

    add: async (data) => {
        db.run(`INSERT INTO stock (
            product_name, 
            sale_price, 
            cost_price, 
            expiry_date, 
            quantity
        ) VALUES(
            '${data.product_name}',
            ${data.sale_price},
            ${data.cost_price},
            '${data.expiry_date}',
            ${data.quantity}
        )`, err => {
            if (err) {
                console.error(err.message);
                return false;
            }
            console.log("Inserted into 'Stock' table");
        });
        return true;
    },

    getAll: () => {
        return new Promise(function (resolve, reject) {
            db.all("SELECT * FROM stock ORDER BY product_name asc", (e, rows) => {
                resolve(rows);
            });
        })
    },

    getOne: (id) => {
        return new Promise(function (resolve, reject) {
            db.get(`SELECT * FROM stock WHERE id = ?`, [id], (e, row) => {
                resolve(row);
            });
        })
    },

    deleteOne: (id) => {
        return new Promise(function (resolve, reject) {
            db.run(`DELETE FROM stock WHERE id = ?`, [id], (e) => {
                resolve(true);
            });
        })
    },

    updateOne: (id, data) => {
        return new Promise(function (resolve, reject) {
            db.run(`UPDATE stock set product_name = ?, cost_price = ?, sale_price = ?, expiry_date = ?, quantity = ? WHERE id = ?`, [data.product_name, data.cost_price, data.sale_price, data.expiry_date, data.quantity, id], err => {
                if (err) reject(false);
                else resolve(true);
            })
        });
    }
}

module.exports = {
    stock
}