const userModule = require('../../models/users')
const { Decrypt,Encrypt } = require('../../modules/crypto')
const jwt = require('jsonwebtoken')

//获取列表信息
const getAccountList = async (req, res, next) => {
    let { pageSize, pageNo, search, sortBy, sort } = req.query;
    let data = await userModule.getAccountList({ pageSize, pageNo, search, sortBy, sort });
    let obj = data.items.map((item) => {
        return Object.assign({}, item._doc, {
            username: item.username,
            img: item.avatar
        })
    });
    res.responseData = {
        items: obj,
        pages: data.pages
    }
    next('success')
}

//删除账号
const deleteItemByUsername = async (tokenInfo,req, res, next) => {
    if ( tokenInfo.rank > 2 ) { // 验证是否可以
        next('error')
        return false
    }
     let idCheck = await userModule.checkAlready({
         username:req.body.username
        })

    try {
        let username = req.body.username;       
        let data= await userModule.deleteItemByUsername(username);
        next('success');
    } catch (e) {
        next('error')
    }
}

//获取一条数据
const getItemByUsername = async (req, res, next) => {
    let username = req.params.username
    try {
        let data = await userModule.getItemByUsername(username)
        let item = data[0]
        res.responseData = Object.assign({}, item._doc)
        next('success')
    } catch (e) {
        next('error')
    }
}

//注册信息
const register = async (req,res,next) => {
 

    //判断用户名是否输入
    if(!req.body.username){
        next('username no exist')
        return false
    }
   
    let userExist = await userModule.checkAlready({username:req.body.username})
    //判断用户名是否存在
    if (userExist.length) {
        next('username exist')
        return false
    }

    //密码是否输入
    if(!req.body.password){
        next('password no exist')
        return false
    }
    
   try{ 
       let data = await userModule.register(req.body)
       next('success')
   }catch(e){
       next('error')
   }
 
}

const login =async (req,res,next) => {
        let text = Decrypt(req.cookies.mark)
        if ( req.body.code.toLowerCase() !== text ) {
            // 验证码不正确
            next('code wrong')
            return false
        }
        //管理员登陆
        if(req.body.isAdm==="true"){
            if(req.body.username !== "admin"){
                next('username unexist')
                return false
            }
            let admExist = await userModule.checkAlready({username:req.body.username})
           
            //验证密码
            if( admExist[0].password !==req.body.password ){
                next('unreal password')
                return false
            }
            //成功后传给前端token
            let token = jwt.sign({
                uid:admExist[0]._id,
                username:admExist[0].username,
                rank:admExist[0].rank,
            },'cc')
            res.responseData = {
                token: Encrypt(token),
                rank:admExist[0].rank,
            }
            next('success')
        }   
        let userExist = await userModule.checkAlready({username:req.body.username})

        //如果普通登陆是管理员
        if( userExist[0].username === "admin"){
            next('username unexist')
            return false
        }
        //查找用户名
        if( !userExist.length ){
            next('username unexist')
            return false
        }
        
        //验证密码
        if( userExist[0].password !==req.body.password ){
            next('unreal password')
            return false
        }
        
        //成功后传给前端token
        let token = jwt.sign({
            uid:userExist[0]._id,
            username:userExist[0].username,
            rank:userExist[0].rank,
        },'cc')
        res.responseData = {
            token: Encrypt(token),
            rank:userExist[0].rank,
        }

        next('success')

}
// 登录验证
const auth = (tokenInfo, req, res, next) => {
    next('success')
}
//得到用户信息
const info = async (tokenInfo, req, res, next) => {
    let usernameExist = await userModule.checkAlready({ 
        _id: tokenInfo.uid
    })
    let item = Object.assign({}, usernameExist[0]._doc)
    delete item.password
    res.responseData = item
    next('success') 
}
//修改密码
const change = async (tokenInfo,req,res,next) => {
    if(req.body.passwordTwo !== req.body.passwordOne){
        next('password no equal')
    }
    
    let data = await userModule.change({
        id:tokenInfo.uid,
        password : req.body.password
    })
    next('success')
}

//更新数据
const updateItem = async (tokenInfo,req, res, next) => {

    let idCheck = await userModule.checkAlready({
        username:req.body.username
       })
    let { username,rank } = req.body;
        try {
            let data = await userModule.updateItem({
                username,rank
            })
            next('success');
        } catch (e) {
            next('error')
        }
}

module.exports ={
    register,
    login,
    auth,
    info,
    change,
    getAccountList,
    deleteItemByUsername,
    getItemByUsername,
    updateItem
}

