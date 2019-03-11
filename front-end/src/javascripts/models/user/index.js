import request from '@utils/request'


//验证是否登陆
const userLoginAuth = () => {
    return $.ajax({
        url:'/api/v1/users/auth',
        data:{
            token:localStorage.token
        }
    })
}


const getUserInfo = () => {
    return request({
        url: '/api/v1/users/info'
    })
}  

export {
    getUserInfo,
    userLoginAuth
}