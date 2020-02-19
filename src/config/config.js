const dotenv = require('dotenv');

const Sequelize = require('sequelize');

dotenv.config();

//console.log(' PGSQL ===>', process.env.PGSQL);

const stringConnect = process.env.PGSQL;

/*
// Option 1: Passing parameters separately
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
/*
}); */

// Option 2: Passing a connection URI
const sequelize = new Sequelize(stringConnect, { logging: false });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
