const { drug } = require('../models/index')

class drugDao {
  static async getDrug(id) {
    return await drug.findOne({
      where: {
        id,
      },
    })
  }

  static async getAllDrug(offset = 0, limit = 50) {
    return await drug.findAll({
      offset,
      limit,
      raw: true,
    })
  }

  static async getDrugAmount() {
    return await drug.count()
  }

  static async insertDrug(name, price, quantity, factory, batch, pd = null, exp = null) {
    return await drug.create({
      name,
      price,
      quantity,
      factory,
      batch,
      pd,
      exp,
    })
  }

  static async updateDrug(id, name, price, quantity, factory, batch, pd, exp) {
    return await drug.update(
      {
        name,
        price,
        quantity,
        factory,
        batch,
        pd,
        exp,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async deleteDrug(id) {
    return await drug.destroy({
      where: {
        id,
      },
    })
  }
}

module.exports = {
  drugDao,
}
