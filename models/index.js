const { sequelize, Sequelize } = require('../config/db');
const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.User= require('./User')(sequelize,Sequelize)
 db.Transaction = require('./Transaction')(sequelize,Sequelize)


db.User.associate(db);
db.Transaction.associate(db);

module.exports = db;