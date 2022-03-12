const { outpatient, outpatient_detail } = require('../models/index')

class outpatientDao {
  static async getOutpatient(id) {
    return await outpatient.findOne({
      where: {
        id,
      },
    })
  }

  static async getOutpatientByDate(date) {
    return await outpatient.findOne({
      where: {
        date,
      },
    })
  }

  static async getAllOutpatient(offset = 0, limit = 50) {
    return await outpatient.findAll({
      order: [['date', 'DESC']],
      include: [
        {
          model: outpatient_detail,
          attributes: [['id', 'key'], 'doctor', 'total'],
        },
      ],
      offset,
      limit,
    })
  }

  static async getOutpatientAmount() {
    return await outpatient.count()
  }

  static async insertOutpatient(date, total, editor) {
    return await outpatient.create({
      date,
      total,
      editor,
    })
  }

  static async updateOutpatient(id, date, total, editor) {
    return await outpatient.update(
      {
        date,
        total,
        editor,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async deleteOutpatient(id) {
    return await outpatient.destroy({
      where: {
        id,
      },
    })
  }

  static async insertOutpatientDetail(outpatient_details) {
    return await outpatient_detail.bulkCreate(outpatient_details)
  }

  static async deleteOutpatientDetail(outpatient_id) {
    return await outpatient_detail.destroy({
      where: {
        outpatient_id,
      },
    })
  }

  static async getOutpatientDetailSum(outpatient_id) {
    return await outpatient_detail.sum('total', {
      where: {
        outpatient_id,
      },
    })
  }
}

module.exports = {
  outpatientDao,
}
