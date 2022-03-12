const router = require('koa-router')()
const chargeController = require('../controllers/chargeController')

router.prefix('/charge')

// 获取收费记录
router.get('/charge', chargeController.getCharge)

// 获取所有收费记录
router.get('/charges', chargeController.getAllCharge)

// 获取某日收费总金额
router.get('/sum', chargeController.getChargeSum)

// 新增收费记录
router.post('/insert', chargeController.insertCharge)

// 修改收费记录
router.post('/update', chargeController.updateCharge)

// 删除收费记录
router.post('/delete', chargeController.deleteCharge)

module.exports = router
