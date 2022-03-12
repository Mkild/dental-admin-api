module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'charge',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'project',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'amount',
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'signature',
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'date',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  )
}
