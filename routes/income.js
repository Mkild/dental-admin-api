const router = require('koa-router')()
const incomeController = require('../controllers/incomeController')

router.prefix('/income')

// 获取收入记录
router.get('/income', incomeController.getIncome)

// 根据日期获取收入记录
router.get('/dateincome', incomeController.getIncomeByDate)

// 获取所有收入记录
router.get('/incomes', incomeController.getAllIncome)

// 新增收入记录
router.post('/insert', incomeController.insertIncome)

// 修改收入记录
router.post('/update', incomeController.updateIncome)

// 删除收入记录
router.post('/delete', incomeController.deleteIncome)

module.exports = router
