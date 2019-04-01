const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/house', { useNewUrlParser: true })
var Schema = mongoose.Schema;


//mongoose用来记录版本  {versionKey: false}  不会自动增加_v字段
var houseListItems = new Schema({
    username:String,
    password:String,
    avatar:String,
    rank:Number,
    isAdm:Boolean
});

//将定制好表的列的限制运用在items表上   单数会自动加s
var User = mongoose.model('users', houseListItems);

//插入注册信息
const register = (params) => {
    params.isAdm = false
    params.avatar = params.avatar || '/images/user/person.jpg' //默认头像
    params.rank = 2
    return User.insertMany(params)
}
//查找有没有相同的
const checkAlready = (option) => {
    return User.find(option)
}
//查找管理员
// const checkAdm = (option) => {
//     return User.find(option)
// }
//替换密码
const change = (option) => {
    let id=option.id;
    delete option._id;
      // 去除空参数的影响
    //   for ( var key in data ) {
    //     if ( !data[key] ) delete data[key]
    // }
    return User.update({_id: id}, option)
}

//删除数据
const deleteItemByUsername=(username)=>{
    return User.remove({username:username})
}

const getCount = (query) => {
    return User.find(query).count();
};

//通过id获得全部信息
const getItemByUsername = (username) => {
    return User.find({ username: username }).exec()
}

//获取全部信息
const getAccountList = async({ pageSize, pageNo, search,sortBy, sort }) => {
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
    return User.find(query)
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

//更新数据
const  updateItem=(data)=>{ 
    let username=data.username;
    delete data.username;
      // 去除空参数的影响
      for ( var key in data ) {
        if ( !data[key] ) delete data[key]
    }
    return User.update({username: username}, data)
}



module.exports ={
    register,
    checkAlready,
    change,
    getAccountList,
    deleteItemByUsername,
    getItemByUsername,
    updateItem
    // checkAdm
}