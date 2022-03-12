const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { userDao } = require('../services/userService')
const key = require('./key_config.js')
const encryption = require('../lib/encryption')

// 本地验证
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async function (username, password, done) {
      const user = await userDao.getUser(username)
      if (user) {
        if (user.state === false) return done(null, false, '该用户封禁中')
        let pwd = await encryption.MD5(password, user.salt)
        if (pwd === user.password && user.state === true) {
          return done(null, user, '登录成功')
        } else {
          return done(null, false, '密码错误')
        }
      } else {
        return done(null, false, '该用户不存在')
      }
    }
  )
)

// jwt验证
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key.secretKey
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    // jwt_payload 返回的是登录时返回的数据 即payload
    const user = await userDao.getUserById(jwt_payload.id)
    if (user.state === false) return done(null, false, '该用户封禁中')
    if (user && user.state === true) {
      const userrole = await userDao.getUserRole(jwt_payload.username)
      user.userrole = userrole
      //保护密码
      user.password = ''
      user.salt = ''
      return done(null, user, '验证成功')
    } else {
      return done(null, false, '验证失败')
    }
  })
)

// serializeUser在用户登录验证成功以后将会把用户的数据存储到session中
passport.serializeUser(function (user, done) {
  //保护密码
  user.password = ''
  user.salt = ''
  done(null, user)
})

// deserializeUser在每次请求的时候将从session中读取用户对象
passport.deserializeUser(function (user, done) {
  done(null, user)
})

module.exports = passport
