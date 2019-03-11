const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/house', { useNewUrlParser: true })
var Schema = mongoose.Schema;


//mongoose用来记录版本  {versionKey: false}  不会自动增加_v字段
var houseListItems = new Schema({
    username:String,
    password:String,
    avatar:String,
    rank:Number
});

//将定制好表的列的限制运用在items表上   单数会自动加s
var User = mongoose.model('users', houseListItems);

//插入注册信息
const register = (params) => {
    params.avatar = params.avatar || '/static/images/person.jpg' //默认头像
    params.rank = 2
    return User.insertMany(params)
}
//查找有没有相同的
const checkAlready = (option) => {
    return User.find(option)
}
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
module.exports ={
    register,
    checkAlready,
    change
}