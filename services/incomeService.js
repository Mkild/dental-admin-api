const { income } = require('../models/index')

class incomeDao {
  static async getIncome(id) {
    return await income.findOne({
      where: {
        id,
      },
    })
  }

  static async getIncomeByDate(date) {
    return await income.findOne({
      where: {
        date,
      },
    })
  }

  static async getAllIncome(offset = 0, limit = 50) {
    return await income.findAll({
      order: [['date', 'DESC']],
      offset,
      limit,
      raw: true,
    })
  }

  static async getIncomeAmount() {
    return await income.count()
  }

  static async insertIncome(date, total, editor) {
    return await income.create({
      date,
      total,
      editor,
    })
  }

  static async updateIncome(id, date, total, editor) {
    return await income.update(
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

  static async deleteIncome(id) {
    return await income.destroy({
      where: {
        id,
      },
    })
  }
}

module.exports = {
  incomeDao,
}
