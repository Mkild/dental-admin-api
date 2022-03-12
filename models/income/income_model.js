module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'income',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'date',
      },
      total: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
        field: 'total',
      },
      editor: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'editor',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  )
}
