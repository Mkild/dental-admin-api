module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user_role',
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
        field: 'username',
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  )
}
