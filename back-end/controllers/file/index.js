

//如果错误存在返回illegal    错误不存在 把图片的路径返给前端
const fileUploadImage = (req, res, next) => {
    if ( req.error ) {
        next('illegal')
    } else {
        res.responseData = {
            img: req.body.img
        }
        next('success')
    }
    
    
}

module.exports = {
    fileUploadImage
}