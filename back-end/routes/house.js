var express = require('express');
var router = express.Router();
const houseController=require('../controllers/house/index')
const {response ,authLogin}=require('../middlewares/index')


//获得列表数据
router.get('/items', houseController.getHouseList,response);
//发送数据
router.post('/item',authLogin, houseController.postHouseItem,response);
//删除某条数据
router.delete('/item',authLogin,houseController.deleteItemById,response)
//查询某条数据
router.get('/item/:id', houseController.getHouseItemById, response)
 //更新数据
 router.put('/item',authLogin, houseController.updateItem,response)
 
module.exports = router;
