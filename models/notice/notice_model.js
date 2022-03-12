module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'notice',
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
        field: 'title',
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'author',
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  )
}
