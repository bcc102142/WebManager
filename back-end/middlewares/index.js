
const status = require('../modules/status');
const multer = require('multer');
const path = require('path');
const svgCaptcha =require('svg-captcha')
const { Decrypt,Encrypt } = require('../modules/crypto')
const jwt = require('jsonwebtoken')

const jsonFormat = (req, res, next) => {
    res.setHeader('encoding', 'utf-8')
    res.setHeader('content-type', 'application/json; charset=utf8')
    next()
}
//根据status里面的设置来判断返回的状态   通过渲染default页面之后返回数据
const response = (stat, req, res, next) => {
    console.log("111")
    res.render('default', {
        data: JSON.stringify(res.responseData || {}),
        status: status[stat]
    })
}
//接受图片  保存图片
const uploadImage = (req, res, next) => {
    // 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // 接收到文件后输出的保存路径（若不存在则需要创建）
            cb(null, path.join(__dirname, '../public/images/upload'));
        },
        filename: function (req, file, cb) {
            // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
            let extname = path.extname(file.originalname);
            let basename = path.basename(file.originalname, extname);
            let filename = basename + '-' + Date.now() + extname;
            //把图片名绑在req上响应给前端 
            req.body.img = '/images/upload/' + filename;

            cb(null, filename);
        }
    });
    //判断上传的文件的格式  fileFilter为文件过滤器
    let fileFilter = (req, file, cb) => { 
        let flag = file.mimetype.startsWith('image/');
        cb(flag ? null : '请上传正确的图片格式', flag)
    }
    //接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file 和filedname命名一致
    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('movieImg') // 上传文件的中间件


    upload(req, res, (err) => {
        if (err) {
            req.err = err;
            next();
        } else {
            console.log(req.body.img)
            next();
        }
    })
}
const getCode = (req,res,next) => {
    var codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44 
    }
    var captcha = svgCaptcha.create(codeConfig);
    // req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    let text = captcha.text.toLowerCase()  // 真正的验证码内容

    let mark = Encrypt(text) //加密

    var codeData = {
        img:captcha.data,
        mark:mark
    }
    res.send(codeData)
}
// token验证是否登录中间件
const authLogin = (req, res, next) => {

    let token = req.method === 'GET' ? req.query.token : req.body.token
    
    if ( !token ) {
        res.render('default', {  
            data: JSON.stringify({}), 
            status: status['not login']
        })
        return false
    }
    try {
        token = Decrypt(token)
       
        let tokenInfo = jwt.verify(token, 'cc')
        console.log(tokenInfo)
        let now = Date.now() / 1000
        let expires = 60 * 60 * 2 // 2个小时过期时间
        // if ( now - tokenInfo.iat > expires ) {
        //     res.render('default', {  
        //         data: JSON.stringify({}), 
        //         status: status['not login']
        //     })
        //     return false;
        // }
        next(tokenInfo)
    } catch (e) {
        res.render('default', {  
            data: JSON.stringify({}), 
            status: status['not login']
        })
    }
}
module.exports = {
    jsonFormat,
    response,
    uploadImage,
    getCode,
    authLogin
}






// // 接收图片
// const uploadImage = (req, res, next) => {
//     // 控制图片存储位置与信息
//     var storage = multer.diskStorage({
//         // 控制存储位置
//         destination: function (req, file, cb) {
//             cb(null, path.join(__dirname, '../public/images/upload'))
//         },
//         filename: function (req, file, cb) {
//             // 处理存储时的文件名字
//             let extname = path.extname(file.originalname)
//             let basename = path.basename(file.originalname, extname)
//             let filename = basename + '-' + Date.now() + extname
//             // 挂载在req.body上方便传递给下一个中间件
//             req.body.img = '/images/upload/' + filename
//             cb(null, filename)
//         }
//     })
//     // 文件类型过滤
//     let fileFilter = (req, file, cb) => {
//         let flag = file.mimetype.startsWith('image/')
//         cb(flag ? null : '请上传正确的图片格式', flag)
//     }

//     let upload = multer({ storage, fileFilter }).single('movieImage') // 上传文件的中间件

//     upload(req, res, (err) => {
//         if ( err ) {
//             req.error = err
//             next()
//         } else {
//             next()
//         }
//     })


// }