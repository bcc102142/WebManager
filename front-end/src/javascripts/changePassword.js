;(function(){

   let $changePasswordform = $('.templatemo-changePassword-form')
    let $passwordOne = $('#changePassword-passwordOne')
    let $passwordTwo = $('#changePassword-passwordTwo')
      
       



    $changePasswordform.submit(changePassword)




    //点击提交
    function changePassword (e) { 
        e.preventDefault()  
        let passwordOne = $passwordOne.val()
        let passwordTwo = $passwordTwo.val()

        $.ajax({
            url: '/api/v1/users/change',
            type: 'post',
            data: { 
                passwordOne:passwordOne,
                password: passwordTwo ,
                token:localStorage.token,
                passwordTwo:passwordTwo
            },
            
        }).done(function(res) {
            console.log(res)
            if ( res.code === 200 ) {
                //退出登陆，回到登陆界面
                    $('.changePassword-error').text(res.msg).fadeIn(1000)  ;
                    $('.changePassword-error').text(res.msg).fadeOut(1000)
                localStorage.removeItem('token')
                setTimeout(function(){
                    window.location.href = '/admin.html'
                },2000)
            }else{
                $('.changePassword-error').text(res.msg).fadeIn(1000)  ;
                $('.changePassword-error').text(res.msg).fadeOut(1000)
            }
            
        })

    }


})()