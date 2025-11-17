const { Sequelize } = require('sequelize');

const connectionString = process.env.DATABASE_URL;
let sequelize;

if (connectionString) {
  sequelize = new Sequelize(connectionString, {
    dialect: 'mysql',
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    }
  );
}

module.exports = sequelize;
