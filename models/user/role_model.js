module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'role',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rolename: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'rolename',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  )
}
