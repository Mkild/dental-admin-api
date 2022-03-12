module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'record',
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
      illness: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'illness',
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'text',
      },
      dp: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'dp',
      },
      doctor: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'doctor',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  )
}
