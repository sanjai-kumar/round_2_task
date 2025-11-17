const Sequelize = require("sequelize");
const sequelize = require("../config/config.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Category = require("./category")(sequelize, Sequelize.DataTypes);
db.Product  = require("./product")(sequelize, Sequelize.DataTypes);

// Setup relations
if (db.Category.associate) db.Category.associate(db);
if (db.Product.associate) db.Product.associate(db);

module.exports = db;
