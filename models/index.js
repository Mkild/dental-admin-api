// 引入Sequelize配置
const Sequelize = require('sequelize')
const db = require('../config/mysql_sequelize')

// 引入sequelize对象
const sequelize = db.sequelize

// 引入数据表模型
const user = require('./user/user_model')(sequelize, Sequelize.DataTypes)
const role = require('./user/role_model')(sequelize, Sequelize.DataTypes)
const user_role = require('./user/user_role_model')(sequelize, Sequelize.DataTypes)
const user_detail = require('./user/user_detail_model')(sequelize, Sequelize.DataTypes)
const notice = require('./notice/notice_model')(sequelize, Sequelize.DataTypes)
const notice_text = require('./notice/notice_text_model')(sequelize, Sequelize.DataTypes)
const department = require('./department/department_model')(sequelize, Sequelize.DataTypes)
const drug = require('./drug/drug_model')(sequelize, Sequelize.DataTypes)
const record = require('./record/record_model')(sequelize, Sequelize.DataTypes)
const charge = require('./charge/charge_model')(sequelize, Sequelize.DataTypes)
const charge_detail = require('./charge/charge_detail_model')(sequelize, Sequelize.DataTypes)
const income = require('./income/income_model')(sequelize, Sequelize.DataTypes)
const outpatient = require('./outpatient/outpatient_model')(sequelize, Sequelize.DataTypes)
const outpatient_detail = require('./outpatient/outpatient_detail_model')(sequelize, Sequelize.DataTypes)
const feedback = require('./feedback/feedback_model')(sequelize, Sequelize.DataTypes)

// 自动建表
user.sync({ force: false })
user_role.sync({ force: false })
role.sync({ force: false })
user_detail.sync({ force: false })
notice.sync({ force: false })
notice_text.sync({ force: false })
department.sync({ force: false })
drug.sync({ force: false })
record.sync({ force: false })
charge.sync({ force: false })
charge_detail.sync({ force: false })
income.sync({ force: false })
outpatient.sync({ force: false })
outpatient_detail.sync({ force: false })
feedback.sync({ force: false })

// 表关系
user.hasOne(user_role, {
  foreignKey: 'username',
  sourceKey: 'username',
})

user.hasOne(user_detail, {
  foreignKey: 'username',
  sourceKey: 'username',
})

user_role.belongsTo(user, {
  foreignKey: 'username',
  targetKey: 'username',
})

user_role.belongsTo(role, {
  foreignKey: 'role_id',
  targetKey: 'id',
})

user_detail.belongsTo(user, {
  foreignKey: 'username',
  targetKey: 'username',
})

notice.belongsTo(user, {
  foreignKey: 'author',
  targetKey: 'username',
})

notice.hasOne(notice_text, {
  foreignKey: 'notice_id',
  sourceKey: 'id',
})

notice_text.belongsTo(notice, {
  foreignKey: 'notice_id',
  targetKey: 'id',
})

record.belongsTo(department, {
  foreignKey: 'dp',
  targetKey: 'name',
})

charge.hasMany(charge_detail, {
  foreignKey: 'charge_id',
  sourceKey: 'id',
})

charge_detail.belongsTo(charge, {
  foreignKey: 'charge_id',
  sourceKey: 'id',
})

income.belongsTo(user, {
  foreignKey: 'editor',
  targetKey: 'username',
})

outpatient.belongsTo(user, {
  foreignKey: 'editor',
  targetKey: 'username',
})

outpatient.hasMany(outpatient_detail, {
  foreignKey: 'outpatient_id',
  sourceKey: 'id',
})

outpatient_detail.belongsTo(outpatient, {
  foreignKey: 'outpatient_id',
  sourceKey: 'id',
})

feedback.belongsTo(user, {
  foreignKey: 'editor',
  targetKey: 'username',
})

module.exports = {
  user,
  role,
  user_role,
  user_detail,
  notice,
  notice_text,
  department,
  drug,
  record,
  charge,
  charge_detail,
  income,
  outpatient,
  outpatient_detail,
  feedback,
}
