import SMERouter from 'sme-router';
import angel from '@utils/angel';
import appPublishController from '@controllers/message/app-publish-controller';
import appDetailController from '@controllers/message/app-detail-controller';
import appSelectController from '@controllers/message/app-select-controller';
import appHomeController from '@controllers/message/app-home-controller';
import appDeleteController from '@controllers/message/app-delete-controller';
import appAccountController from '@controllers/users/app-account-controller';
import appUserDeleteController from '@controllers/users/app-userDelete-controller';
import appUserAuthorizationController from '@controllers/users/app-authorization-controller';


const render = () => {
    const router = new SMERouter('web-content');
    //首页
    router.route('/message/home', appHomeController.render);
    //发布
    router.route('/message/publish', appPublishController.render);
    //详情页
    router.route('/message/detail/:id', appDetailController.render);
    //查询所有 
    router.route('/message/select', appSelectController.render);
    //删除数据
    router.route('/message/delete/:id', appDeleteController.render);
    //所有账号
    router.route('/message/account', appAccountController.render);
    //删除账号
    router.route('/user/delete/:username', appUserDeleteController.render);
     //点击授权
    router.route('/user/authorization/:username', appUserAuthorizationController.render);

    
    router.route('*', (req, res) => {
        res.redirect('/#/message/select')
    })
    router.use((req, res, next) => {
        // 根据当前路由前后左边导航的显示情况
        activeNavLink(req)
    });
    angel.on('go', router.go.bind(router))
    angel.on('back', router.back.bind(router))
}


function activeNavLink(req) {
    let route = req.route
    let firstRoute = route.split('/')[2] // 一级路由路径
    let $asideA = $('.aside-nav a');
    let $navA = $('.text-uppercase a');
    let length = $asideA.length;
    for (let i = 0; i < length; i++) {
        let $firstAItem = $asideA.eq(i)
        let ownDataRoute = $firstAItem.data('route')
        if (ownDataRoute === firstRoute) {
            $firstAItem.parent().siblings().find('a').removeClass('active');
            $firstAItem.addClass('active');
            $navA.eq(i).parent().siblings().find('a').removeClass('active');
            $navA.eq(i).addClass('active');
        }
    }
    // for(let i=0; i<length;i++){
    //     let $navAItem = $navA.eq(i)
    //     let ownDataRoute = $navAItem.data('route')
    //     if(ownDataRoute===firstRoute){
    //         $navAItem.parent().siblings().find('a').removeClass('active');
    //         $navAItem.addClass('active')
    //     }
    // }
    // console.log($navAItem)
}
export default {
    render
}