const userModule = require('../../models/users')
const { Decrypt,Encrypt } = require('../../modules/crypto')
const jwt = require('jsonwebtoken')
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
        let userExist = await userModule.checkAlready({username:req.body.username})
        
        

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
module.exports ={
    register,
    login,
    auth,
    info,
    change
}

