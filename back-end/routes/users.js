var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users')
const { response,getCode,authLogin } = require('../middlewares/index')

/* GET users listing. */


//注册
router.post('/register', usersController.register, response)
//登陆
router.post('/login', usersController.login, response)
//验证码
router.get('/code', getCode)
//登陆鉴权
router.get('/auth', authLogin, usersController.auth, response)
//得到用户信息
router.get('/info', authLogin, usersController.info, response)
//修改密码
router.post('/change',authLogin, usersController.change, response)

module.exports = router;
