
import appAsideHtml from '@views/layout/app-aside.html';
import appRightHtml from '@views/layout/app-right.html';
import appUserHtml from '@views/layout/app-user.html';
import {getUserInfo} from '../models/user/index';
import angel from '@utils/angel';
import { Transform } from 'stream';


const render= async()=>{
    $('#web').append(appAsideHtml);
    $('#web').append(appRightHtml);
    
    $('.router-link').click(function () {
        let url = $(this).data('route') // 获取url
        angel.emit('go', url) // 进行跳转
    })

    //渲染用户信息
    let data = await getUserInfo()
    console.log(data)
    //$('#web').append(appUserHtml)
    $('#user').html(template.compile(appUserHtml)({
        info: data
    })) // 放入头部

    bindEvent()
    
}

function bindEvent(){
        //修改密码
        $('.change-password').click( function(){
            window.location.href = '/changePassword.html'
        })
        //退出登陆
        $('.exit-btn').click(function () {
            // 前端自己删除token，清除内存占用
            localStorage.removeItem('token')
            window.location.href = '/admin.html'
            // 前端跳转到登录
        })
        //头像信息
        $('.user-click').click(function (e) {
            // 前端自己删除token，清除内存占用
           
            $('.user-info').data('type',!$('.user-info').data('type'))
            if(!$('.user-info').data('type')) $('.user-info').height(210);
            else{
                $('.user-info').height(0);
            }
           
            // 前端跳转到登录
        })
        //侧边导航收缩
        let bool = true
        $('.glyphicon-menu-hamburger').click(function (e) {
            console.log(111)
            bool =!bool
            if(bool){
                $('.templatemo-sidebar').css({
                    transition:"all 1s",
                    width:"250px",
                    overflew:"hidden"
                })
            }else{
                $('.templatemo-sidebar').css({
                    transition:"all 1s",
                    width:"0",
                })
               
            }
          
            
           
            // 前端跳转到登录
        })
}

export default{
    render
}