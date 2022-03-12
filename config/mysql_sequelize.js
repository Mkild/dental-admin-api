//sequelize配置
const Sequelize = require('sequelize')
const sequelize = new Sequelize('dental_system', 'root', 'wwssaadd', {
  host: 'localhost',
  dialect: 'mysql',
  // operatorsAliases:false,
  dialectOptions: {
    //字符集
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    //为false时，会自动给表名加上复数s造成查询数据失败。
    freezeTableName: true,
    // 是否为表添加 createdAt 和 updatedAt 字段
    // createdAt 记录表的创建时间
    // updatedAt 记录字段更新时间
    timestamps: false,
    // 是否为表添加 deletedAt 字段,并不删除
    paranoid: false,
    operatorsAliases: false,
  },
  // 东八时区
  timezone: '+08:00',
})
module.exports = {
  sequelize,
}
