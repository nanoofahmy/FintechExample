const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {

  const Transaction = sequelize.define
    ('Transactions',
      {
        id:
        {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,

        },
        amount:
        {
          type: DataTypes.DOUBLE,
          allowNull: false
        },
        status:
        {
          type: Sequelize.STRING(20),
          required: true,
          defaultValue: 'pending',
          validate: {
            isIn: {
              args: [
                ['success', 'pending', 'failed']
              ],
              msg: 'Transaction status should has a status'
            }
          }
        },

      }, { freezeTableName: true, timestamps: true })

  Transaction.associate = models => {
    Transaction.belongsTo(models.User , { allowNull: false });
  }
  return Transaction;
}


