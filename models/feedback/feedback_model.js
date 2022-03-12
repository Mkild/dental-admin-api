module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'feedback',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name',
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'text',
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
