module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user_detail',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'name',
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username',
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'gender',
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'phone',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'email',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  )
}
