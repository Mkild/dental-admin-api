module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'drug',
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
      factory: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'factory',
      },
      batch: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'batch',
      },
      pd: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'pd',
      },
      exp: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'exp',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  )
}
