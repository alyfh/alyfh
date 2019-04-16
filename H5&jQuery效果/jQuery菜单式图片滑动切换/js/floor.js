$(function(){

	// floorCon-slide
	$(".floorCon-slide .floorConSlideImgNav li span").css({opacity:0.95})
	$(".floorCon-slide .floorConSlideImgNav li.hover").find("span").css({left:0})//初始
	$(".floorCon-slide .floorConSlideImgNav li").mouseover(function(){
		if($(this).hasClass("hover")){return}//不处理满足状态的
		  var imgleft=$(this).index()*200*(-1)+"px";

		  $(this).addClass("hover").find("span").stop().animate({left:0},400)
		  $(this).siblings().removeClass("hover").find("span").stop().animate({left:"-20px"},600)
		  //图片显示
		  $(this).parent().prev(".floorConSlideImg").stop().animate({left:imgleft},400);
	})

})