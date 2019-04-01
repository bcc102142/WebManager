;(function(){

    let targetType = 'login' // 当前显示的类型
    
    // 用到的dom元素
    let $loginFormBox = $('.login')
    let $loginForm = $('.templatemo-login-form')
    let $registerFormBox = $('.register')
    let $registerForm = $('.templatemo-register-form')
    let $admloginFormBox = $('.admlogin')
    let $admloginForm = $('.templatemo-admlogin-form')
    let $changeTypeBtns = $('.blue-text')
    let $code = $('.code')

    let $registerInps = {
        username: $('#register-username'),
        password: $('#register-password'),
        nickname: $('#register-nickname')
    }
    let $loginInps = {
        username: $('#login-username'),
        password: $('#login-password'),
        code: $('#login-code')
    }
    let $admloginInps = {
        username: $('#admlogin-username'),
        password: $('#admlogin-password'),
        code: $('#admlogin-code')
    }

    // 进行初始化动作
    init()


    function init () { // 初始化函数
        renderTargetForm()
        bindEvents() // 事件绑定
    }

    function bindEvents() {
        // 切换按钮点击切换表单
        $changeTypeBtns.click(function (){
            changeType($(this).data('type'))
        })
        // 注册
        $registerForm.submit(register)
        // 登录
        $loginForm.submit(login)
        // 点击切换验证码
        $code.click(getCode)
        //管理员登陆
        $admloginForm.submit(admlogin)
    }

    function register (e) { // 注册逻辑
        e.preventDefault()
        let username = $registerInps.username.val()
        let password = $registerInps.password.val()
        let nickname = $registerInps.nickname.val()
      
        $.ajax({
            url: '/api/v1/users/register',
            type: 'post',
            data: {
                username,
                password,
                nickname
            }
        }).done(function(res) {
            console.log(res)
            if ( res.code === 200 ) {
                $('.register-error').text(res.msg).fadeIn(1000)  ;
                $('.register-error').text(res.msg).fadeOut(1000)
               setTimeout(() => {
                changeType('login')
               },1000) 
            }else{
                renderRegisterError(res)
            }
            
        })

    }


    function login (e) { // 登陆逻辑
        e.preventDefault()
        let username = $loginInps.username.val()
        let password = $loginInps.password.val()
        let code = $loginInps.code.val()
        
        $.ajax({
            url: '/api/v1/users/login',
            type: 'post',
            data: {
                username,
                password,
                code
            }
        }).done(function(res) {
            if ( res.code === 200 ) {
                //把token存入本地
                localStorage.token = res.data.token
                localStorage.rank = res.data.rank
                //登陆成功后跳转
                $('.login-error').text(res.msg).fadeIn(1000)  ;
                 $('.login-error').text(res.msg).fadeOut(1000)
                 setTimeout(function(){
                    window.location.href = '/'
                },2000)
               
            } else {
                getCode() // 如果登录失败更改验证码
            }
            console.log(res,11) //登陆反馈的信息
            renderLoginError(res) //登陆失败提示信息渲染
        })

    }

    function admlogin (e) { // 登陆逻辑
        e.preventDefault()
        
        let username = $admloginInps.username.val()
        let password = $admloginInps.password.val()
        let code = $admloginInps.code.val()
        $.ajax({
            url: '/api/v1/users/login',
            type: 'post',
            data: {
                username,
                password,
                code,
                isAdm:'true'
            }
        }).done(function(res) {
            if ( res.code === 200 ) {
                console.log(res)
                //把token存入本地
                localStorage.token = res.data.token
                localStorage.rank = res.data.rank
                //登陆成功后跳转
                $('.login-error').text(res.msg).fadeIn(1000)  ;
                 $('.login-error').text(res.msg).fadeOut(1000)
                 setTimeout(function(){
                    window.location.href = '/#/message/account'
                },2000)
               
            } else {
                getCode() // 如果登录失败更改验证码
            }
            console.log(res,11) //登陆反馈的信息
            renderLoginError(res) //登陆失败提示信息渲染
        })

    }

    function changeType (type) { // 切换类型
        targetType = type
        renderTargetForm()
    }

    function renderTargetForm () { // 渲染对应的表单  
        if ( targetType === 'register' ) {
            $loginFormBox.addClass('hidden')
            $registerFormBox.removeClass('hidden')
            $admloginFormBox.addClass('hidden')
        } 
        else if(targetType === 'login' ) {
            $loginFormBox.removeClass('hidden')
            $registerFormBox.addClass('hidden')
            $admloginFormBox.addClass('hidden')
            getCode() // 获取验证码
        }else{
            $loginFormBox.addClass('hidden')
            $registerFormBox.addClass('hidden')
            $admloginFormBox.removeClass('hidden')
            }
        }
            

    function getCode () { // 验证码
        $.ajax({url: '/api/v1/users/code'})
                .done(res => {
                    $code.html(res.img)
                    $.cookie('mark', res.mark)
                })
    }

    function  renderLoginError(res){
        $('.login-error').text(res.msg).fadeIn(1000)  ;
        $('.login-error').text(res.msg).fadeOut(1000)
          
    }
    
    function renderRegisterError(res){
        console.log('aaa')
        $('.register-error').text(res.msg).fadeIn(1000)  ;
        $('.register-error').text(res.msg).fadeOut(1000)
    }




})();