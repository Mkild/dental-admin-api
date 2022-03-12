const { department } = require('../models/index')

class departmentDao {
  static async getDepartment(id) {
    return await department.findOne({
      where: {
        id,
      },
    })
  }

  static async getDepartmentByName(name) {
    return await department.findOne({
      where: {
        name,
      },
    })
  }

  static async getAllDepartment(offset = 0, limit = 100) {
    return await department.findAll({
      offset,
      limit,
      raw: true,
    })
  }

  static async getDepartmentAmount() {
    return await department.count()
  }

  static async insertDepartment(name, director) {
    return await department.create({
      name,
      director,
    })
  }

  static async updateDepartment(id, name, director) {
    return await department.update(
      {
        name,
        director,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async deleteDepartment(id) {
    return await department.destroy({
      where: {
        id,
      },
    })
  }
}

module.exports = {
  departmentDao,
}
