const { user, role, user_role, user_detail } = require('../models/index')

class userDao {
  static async getUserById(id) {
    return await user.findOne({
      where: {
        id,
      },
    })
  }

  static async getUser(username) {
    return await user.findOne({
      where: {
        username,
      },
    })
  }

  static async getAllUser(offset = 0, limit = 50) {
    return await user.findAll({
      offset,
      limit,
    })
  }

  static async getUserAmount() {
    return await user.count()
  }

  static async getUserRole(username) {
    return await user_role.findOne({
      include: [
        {
          model: role,
        },
      ],
      where: {
        username,
      },
    })
  }

  static async getUserDetail(username) {
    return await user.findOne({
      include: [
        {
          model: user_role,
          include: [
            {
              model: role,
            },
          ],
        },
        {
          model: user_detail,
        },
      ],
      attributes: ['id', 'username', 'state', 'createdAt', 'updatedAt'],
      where: {
        username,
      },
    })
  }

  static async getAllUserDetail(offset = 0, limit = 50) {
    return await user.findAll({
      offset,
      limit,
      include: [
        {
          model: user_role,
          include: [
            {
              model: role,
            },
          ],
        },
        {
          model: user_detail,
        },
      ],
      attributes: ['id', 'username', 'state', 'createdAt', 'updatedAt'],
    })
  }

  static async getUserDetailAmount() {
    return await user_detail.count()
  }

  static async insertUserDetail(username) {
    return await user_detail.create({
      username,
    })
  }

  static async insertUserAllDetail(name, username, gender, phone, email) {
    return await user_detail.create({
      name,
      username,
      gender,
      phone,
      email,
    })
  }

  static async updateUserDetail(username, name, gender, phone, email) {
    return await user_detail.update(
      {
        name,
        gender,
        phone,
        email,
      },
      {
        where: {
          username,
        },
      }
    )
  }

  static async updateUserUsername(usernamequery, username) {
    return await user.update(
      {
        username,
      },
      {
        where: {
          username: usernamequery,
        },
      }
    )
  }

  static async updateUserPassword(id, password, salt) {
    return await user.update(
      {
        password,
        salt,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async insertUser(username, password, salt) {
    return await user.create({
      username,
      password,
      salt,
      state: 1,
    })
  }

  static async updateUser(usernamequery, username, password, salt) {
    return await user.update(
      {
        username,
        password,
        salt,
      },
      {
        where: {
          username: usernamequery,
        },
      }
    )
  }

  static async deleteUser(id) {
    return await user.destroy({
      where: {
        id,
      },
    })
  }

  static async insertUserRole(username, role_id = 4) {
    return await user_role.create({
      username,
      role_id,
    })
  }

  static async deleteUserRole(username) {
    return await user_role.destroy({
      where: {
        username,
      },
    })
  }

  static async changeUserState(id, state) {
    return await user.update(
      {
        state,
      },
      {
        where: {
          id,
        },
      }
    )
  }

  static async updateUserRole(username, role_id) {
    return await user_role.update(
      {
        role_id,
      },
      {
        where: {
          username,
        },
      }
    )
  }

  static async getAllRole() {
    return await role.findAll()
  }
}

module.exports = {
  userDao,
}
