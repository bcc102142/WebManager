


import appHomeRoute from '@views/routes/app-home-route.html';


const render=(req,res,next)=>{
    res.render(appHomeRoute)

   
    
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      }) 
      $('.swiper-container').width(1000).height(600)
             
    //renderColor()
}

function renderColor(){
    $('#color-change-btn').click(function(){
        $('.color-change-box').data('show',!$('.color-change-box').data('show'))
        
       if($('.color-change-box').data('show')) {
         $('.color-change-box').height(300)
       }else{
        $('.color-change-box').height(0)
       }

    })


    //logo
    $('.logo-color-red').click(function(){
        $('body').css({
             background:'red'
        })
    })
    $('.logo-color-skyblue').click(function(){
        $('body').css({
             background:'skyblue'
        })
    })
    $('.logo-color-hotpink').click(function(){
        $('body').css({
             background:'hotpink'
        })
    })

    //header
    $('.header-color-red').click(function(){
        $('.templatemo-top-nav-container').css({
             background:'red'
        })
    })
    $('.header-color-skyblue').click(function(){
        $('.templatemo-top-nav-container').css({
             background:'skyblue'
        })
    })
    $('.header-color-hotpink').click(function(){
        $('.templatemo-top-nav-container').css({
             background:'hotpink'
        })
    })

     //content
     $('.content-color-red').click(function(){
        $('.light-gray-bg').css({
             background:'red'
        })
    })
    $('.content-color-skyblue').click(function(){
        $('.light-gray-bg').css({
             background:'skyblue'
        })
    })
    $('.content-color-hotpink').click(function(){
        $('.light-gray-bg').css({
             background:'hotpink'
        })
    })
}


export default{
    render
}