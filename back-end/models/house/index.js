const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/house', { useNewUrlParser: true })
var Schema = mongoose.Schema;


//mongoose用来记录版本  {versionKey: false}  不会自动增加_v字段
var houseListItems = new Schema({
    img: String,
    address: String,
    tel: String,
    area: String,
    publishTime: Number,
    description: String,
    price: Number,
    user:String
});//,{versionKey: false}
//将定制好表的列的限制运用在items表上   单数会自动加s
var Message = mongoose.model('message', houseListItems);

//查找
const checkAlready = (option) => {
    return Message.find(option)
}

const getCount = (query) => {
    return Message.find(query).count();
};
//获取全部信息
const getHouseList = async({ pageSize, pageNo, search,sortBy, sort }) => {
    let query = search ? {
        address: new RegExp(search, 'g')
    } : {};
    //获得数据库全部总数量
    let count = await getCount(query);
    let pages = {
        totalNo: count,//总数量 
        totalPage: Math.ceil(count / pageSize) //总页数
    };
    if (sortBy === 'showTime') { 
        sortBy = 'price'; 
    }
    let _sort = {};
    if (sort && sortBy) _sort[sortBy] = sort === '2' ? -1 : 1;
    console.log(_sort)
    return Message.find(query)
        .sort(_sort)
        .limit(~~pageSize)
        .skip((pageNo - 1) * pageSize)
        .then(res => {
            return {
                items: res,
                pages
            }
        });
}


//发布信息
const postHouseItem = (data) => {
    return Message.insertMany(data)
}


//删除数据
const deleteItemById=(id)=>{
    return Message.remove({_id:id})
}

//通过id获得全部信息
const getHouseItemById = (id) => {
    return Message.find({ _id: id }).exec()
}
//更新数据
const  updateItem=(data)=>{ 
    let id=data._id;
    delete data._id;
      // 去除空参数的影响
      for ( var key in data ) {
        if ( !data[key] ) delete data[key]
    }
    return Message.update({_id: id}, data)
}
module.exports = {
    getHouseList,
    postHouseItem,
    deleteItemById,
    getHouseItemById,
    updateItem,
    checkAlready
}