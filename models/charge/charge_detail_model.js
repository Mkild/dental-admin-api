module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'charge_detail',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      charge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'charge_id',
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'item',
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'price',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'quantity',
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'amount',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  )
}
