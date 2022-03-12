const { charge, charge_detail } = require('../models/index')
const Sequelize = require('sequelize')

class chargeDao {
  static async getCharge(id) {
    return await charge.findOne({
      where: {
        id,
      },
    })
  }

  static async getAllCharge(offset = 0, limit = 50) {
    return await charge.findAll({
      order: [['date', 'DESC']],
      include: [
        {
          model: charge_detail,
          attributes: [['id', 'key'], 'item', 'price', 'quantity', 'amount'],
        },
      ],
      offset,
      limit,
    })
  }

  static async getChargeAmount() {
    return await charge.count()
  }

  static async getChargeSum(date) {
    return await charge.sum('amount', {
      where: {
        date,
      },
    })
  }

  static async insertCharge(project, name, amount, signature, date) {
    return await charge.create({
      project,
      name,
      amount,
      signature,
      date,
    })
  }

  static async updateCharge(id, project, name, amount, signature, date) {
    return await charge.update(
      {
        project,
        name,
        amount,
        signature,
        date,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async updateChargeAmount(id) {
    const amount = await this.getChargeDetailSum(id)
    return await charge.update(
      {
        amount,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async deleteCharge(id) {
    return await charge.destroy({
      where: {
        id,
      },
    })
  }

  static async insertChargeDetail(charge_details) {
    return await charge_detail.bulkCreate(charge_details)
  }

  static async deleteChargeDetail(charge_id) {
    return await charge_detail.destroy({
      where: {
        charge_id,
      },
    })
  }

  static async getChargeDetailSum(charge_id) {
    return await charge_detail.sum('amount', {
      where: {
        charge_id,
      },
    })
  }
}

module.exports = {
  chargeDao,
}
