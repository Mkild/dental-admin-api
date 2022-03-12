const md5 = require('md5')
const { v4: uuidv4 } = require('uuid')

const MD5 = async function (val, salt) {
  const passSalt = md5(md5(val) + salt)
  return passSalt
}

const getUuid = function () {
  const uuid = uuidv4()
  return uuid
}

module.exports = { MD5, getUuid }
