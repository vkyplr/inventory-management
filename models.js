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

    getAll: async () => {
        db.all("SELECT * FROM stock", (e, rows) => {
            return rows;
        });
        // console.log(this.r);
    },
}

module.exports = {
    stock
}