const router = require('koa-router')()
const userController = require('../controllers/userController')

router.prefix('/user')

// 根据用户名获取用户
router.get('/user', userController.getUser)

// 根据ID获取用户
router.get('/iduser', userController.getUserById)

// 根据token获取用户(jwt)
router.post('/jwtuser', userController.getUserByJwt)

// 获取所有用户
router.get('/users', userController.getAllUser)

// 新增用户(director)
router.post('/add', userController.addUser)

// 新增用户(admin)
router.post('/insert', userController.insertUser)

// 修改用户
router.post('/update', userController.updateUser)

// 变更用户状态
router.post('/state', userController.changeUserState)

// 修改用户权限
router.post('/role/update', userController.updateUserRole)

// 删除用户
router.post('/delete', userController.deleteUser)

// 获取用户详情
router.get('/detail', userController.getUserDetail)

// 获取所有用户详情
router.get('/details', userController.getAllUserDetail)

// 修改用户详情
router.post('/detail/update', userController.updateUserDetail)

// 修改用户用户名
router.post('/username/update', userController.updateUserUsername)

// 修改用户密码
router.post('/password/update', userController.updateUserPassword)

// 获取所有权限信息
router.get('/roles', userController.getAllRole)

// 登出(本地 jwt不可用)
router.post('/logout', userController.logout)

module.exports = router
