// 切换侧边栏
$(function(){
    // 切换侧边栏
    $(".nav-button").click(toggleSidebar);
    $('#nav_ul li').click(function () {
        $(this).find('a').css({'border-right':'2px solid #F54F36','color':'#F54F36'}).parent().parent().siblings().find('a').css({'border-right':'','color':''});
    })
})

//切换侧边栏显示隐藏
function toggleSidebar(){
    $(".navigation").toggleClass("sss");
    $(".nav-button").toggleClass("nav-buttons");
    return false;
}








//回到顶部
$(function(){
    $(window).scroll(function(){
        if($(this).scrollTop()<300){
            $('.block').hide();
        }else{
            $('.block').show();
        }
    });
    $('.block').click(function(){
        $('body').animate({scrollTop:0},function(){
            return false;
        })

    });
})
