module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'department',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'director',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  )
}
