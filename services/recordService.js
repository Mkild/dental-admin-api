const { record } = require('../models/index')

class recordDao {
  static async getRecord(id) {
    return await record.findOne({
      where: {
        id,
      },
    })
  }

  static async getAllRecord(offset = 0, limit = 50) {
    return await record.findAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit,
      raw: true,
    })
  }

  static async getRecordAmount() {
    return await record.count()
  }

  static async insertRecord(name, illness, text, dp, doctor) {
    return await record.create({
      name,
      illness,
      text,
      dp,
      doctor,
    })
  }

  static async updateRecord(id, name, illness, text, dp, doctor) {
    return await record.update(
      {
        name,
        illness,
        text,
        dp,
        doctor,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async deleteRecord(id) {
    return await record.destroy({
      where: {
        id,
      },
    })
  }
}

module.exports = {
  recordDao,
}
