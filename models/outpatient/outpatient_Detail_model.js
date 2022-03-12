module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'outpatient_detail',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      outpatient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'outpatient_id',
      },
      doctor: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'doctor',
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'total',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  )
}
