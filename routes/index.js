const router = require('koa-router')()
const indexController = require('../controllers/indexController')
const userController = require('../controllers/userController')

router.get('/', indexController.index)

// 登录(本地)
// router.post('/login', indexController.login)

// 登录(jwt)
router.post('/login', indexController.jwtLogin)

// 注册
router.post('/register', indexController.register)

// 根据用户名获取用户
router.get('/user', userController.getUser)

// 根据用户ID获取用户
router.get('/iduser', userController.getUserById)

module.exports = router
