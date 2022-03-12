// 错误信息模板
const errTemps = new Map([
  [
    400,
    {
      msg: '参数错误',
      status: 400,
      type: 'error',
    },
  ],
  [
    404,
    {
      msg: '找不到资源，无法完成操作',
      status: 404,
      type: 'error',
    },
  ],
  [
    500,
    {
      msg: '服务器错误',
      status: 500,
      type: 'error',
    },
  ],
])

// 格式化时间
const dateFormater = (formater, time) => {
  let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds()
  return formater
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

module.exports = {
  errTemps,
  dateFormater,

  isUndef: (v) => v === undefined || v === null,

  isDef: (v) => v !== undefined && v !== null,

  isTrue: (v) => v === true,

  isFalse: (v) => v === false,

  isNum: (v) => typeof v === 'number' && !isNaN(v),

  isBoo: (v) => typeof v === 'boolean',
}
