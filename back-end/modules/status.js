


const status = {
    'success': {
        code: '200',
        msg: 'request is success'
    },
    'miss param': {
        code: '205',
        msg: 'missing params'
    },
    'error': {
        code: '500',
        msg: 'request is error from server'
    },
    'illegal':{
        code: '501',
        msg: '请上传正确的图片格式'
    },
    'username exist': {
        code: '206',
        msg: '用户名已经存在'
    },
    'username unexist': {
        code: '207',
        msg: '用户名不存在'
    },
    'unreal password': {
        code: '208',
        msg: '密码不正确'
    },
    'code wrong': {
        code: '209',
        msg: '验证码不正确'
    },
    'not login': {
        code: '210',
        msg: '未登录'
    },
    'username no exist': {
        code: '211',
        msg: '请输入用户名'
    },
    'password no exist': {
        code: '212',
        msg: '请输入密码'
    },
    'password no equal': {
        code: '213',
        msg: '两次密码不一致'
    },
    'user wrong': {
        code: '300',
        msg: '用户不相同'
    },
}
module.exports = status 