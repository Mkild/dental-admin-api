const router = require('koa-router')()
const departmentController = require('../controllers/departmentController')

router.prefix('/department')

// 获取科室
router.get('/department', departmentController.getDepartment)

// 获取所有科室
router.get('/departments', departmentController.getAllDepartment)

// 新增科室
router.post('/insert', departmentController.insertDepartment)

// 修改科室
router.post('/update', departmentController.updateDepartment)

// 删除科室
router.post('/delete', departmentController.deleteDepartment)

module.exports = router
