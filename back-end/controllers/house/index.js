const houseModel = require('../../models/house/index');
const moment = require('moment');
//获取
const getHouseList = async (req, res, next) => {
    let { pageSize, pageNo, search, sortBy, sort } = req.query;
    let data = await houseModel.getHouseList({ pageSize, pageNo, search, sortBy, sort });
    let obj = data.items.map((item) => {
        let publishTime = moment(item.publishTime).format('YYYY-MM-DD');
        let address = item.address.slice(0, 15);
        return Object.assign({}, item._doc, {
            price: item.price,
            publishTime,
            address,
            tel: item.tel,
            area: item.area,
            img: item.img
        })
    });
    res.responseData = {
        items: obj,
        pages: data.pages
    }
    next('success')
}

//发布
const postHouseItem = async (tokenInfo,req, res, next) => {
    if ( tokenInfo.rank > 2 ) { // 验证是否可以发布
        next('error')
        return false
    }
    let user = tokenInfo.username
    let { address, price, publishTime, description, img, area, tel} = req.body;
  
        try {
            publishTime = moment(publishTime).valueOf();
            let data = await houseModel.postHouseItem({
                address, price, publishTime, description, img, area, tel,user
            })
            next('success')
        } catch (e) {
            next('error')
        }
}
//删除
const deleteItemById = async (tokenInfo,req, res, next) => {

    if ( tokenInfo.rank > 2 ) { // 验证是否可以
        next('error')
        return false
    }
     let idCheck = await houseModel.checkAlready({
         _id:req.body.id
        })
     //如果这条信息的发布者不同
     if(!idCheck[0] ||(idCheck[0].user !== tokenInfo.username &&tokenInfo.rank === 2)){
         next('user wrong')
         return false
     }

    try {
        let id = req.body.id;
       
        let data= await houseModel.deleteItemById(id);
        next('success');
    } catch (e) {
        next('error')
    }
}

//通过id来获取
const getHouseItemById = async (req, res, next) => {
    let id = req.params.id
    try {
        let data = await houseModel.getHouseItemById(id)
        let item = data[0]
        let publishTime = moment(item.publishTime).format('YYYY-MM-DD')
        res.responseData = Object.assign({}, item._doc, {publishTime
        })
        next('success')
    } catch (e) {
        next('error')
    }
}
//更新数据
const updateItem = async (tokenInfo,req, res, next) => {
    if ( tokenInfo.rank > 2 ) { // 验证是否可以
        next('error')
        return false
    }

    let idCheck = await houseModel.checkAlready({
        _id:req.body._id
       })
    //如果这条信息的发布者不同
    if(!idCheck[0] ||(idCheck[0].user !== tokenInfo.username &&tokenInfo.rank === 2)){
        next('user wrong')
        return false
    }




    let { _id, address, price, publishTime, description, img, area, tel } = req.body;
        try {
            publishTime = moment(publishTime).valueOf();
            let data = await houseModel.updateItem({
               _id, address, price, publishTime, description, img, area, tel
            })
            next('success');
        } catch (e) {
            next('error')
        }
}


module.exports = {
    getHouseList,
    postHouseItem,
    deleteItemById,
    getHouseItemById,
    updateItem
}