const { DataTypes  } = require("sequelize");

  module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
      id: {
        type:  DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
        ,
        phoneNumber: {
            type: DataTypes.STRING(14),
            required: true,
            unique: true
          },
          email: {
            type: DataTypes.STRING(50),
            required: false,
            unique: true
          },
          emailOTP: {
            type: DataTypes.STRING(10),
            unique: true
          },
          gender: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'not specified',
          },
          password: {
            type: DataTypes.STRING,
            required: true,
          },
          verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
          },
          createdAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.fn('NOW'),
          },
     },
      { freezeTableName: true, timestamps: true });

      User.associate = models => {
        User.hasMany(models.Transaction, { foreignKey: { allowNull: true } });

      };
    
      return User;
}