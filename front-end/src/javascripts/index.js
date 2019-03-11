
import '@styles/index.scss'
import indexController from '@controllers/index-controller';
import router from '@router';
import { userLoginAuthAction } from './controllers/users/auth'
//如果没有登陆 无法进入首页
userLoginAuthAction()
        .then(res => { // 登录成功
            console.log('111')
            indexController.render()
            router.render()  //???
        }).catch(err => {
            console.log('catch', err)
            $.Toast('Warning', '请登陆后进入', 'warning')
            setTimeout(() => {
                window.location.href = '/admin.html'
            }, 1000)
        })
