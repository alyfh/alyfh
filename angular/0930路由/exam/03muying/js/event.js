$(function(){
	$(".indexNav").on("click","span",function(){
		$(this).addClass("select").siblings().removeClass("select");
	})
	$(".wrap").on("click","button",function(){
		$(this).addClass("sub_select").siblings().removeClass("sub_select");
	})
})