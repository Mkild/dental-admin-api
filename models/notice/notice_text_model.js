module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'notice_text',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      notice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'notice_id',
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'text',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  )
}
