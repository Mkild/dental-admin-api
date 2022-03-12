module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'username',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'salt',
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'state',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  )
}
