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
//获得列表数据
router.get('/accounts', usersController.getAccountList,response);
//删除
router.delete('/item',authLogin, usersController.deleteItemByUsername,response)
//查询某条数据
router.get('/item/:username', usersController.getItemByUsername, response)
 //更新数据
 router.put('/item',authLogin, usersController.updateItem,response)

module.exports = router;
