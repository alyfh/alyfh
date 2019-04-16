$(function(){
	
	$(window).scroll(function(){
		var lan=$(window).scrollTop()
		if (lan>30) {
			$('.rightsidebar').hide()
			$('.mainbav').css({
				'height':'50px',
				'padding-top':'8px'
			})
			$('.mainbav .navLan').css('top','58px')
		}else{
			$('.rightsidebar').show()
			$('.mainbav').css({
				'height':'50px',
				'padding-top':'0px'
			})
			$('.mainbav .navLan').css('top','80px')
		}
	})
	
	//下拉菜单
	$('.subnav .subnavLi').hover(function(){
		$('.subnav .subnavLi').removeClass('checked').eq($(this).index()).addClass('checked')
		$('.subnav .subnavLi .navLan').stop(true).slideUp().eq($(this).index()).stop(true).slideDown()
	},function(){
		$('.subnav .subnavLi').removeClass('checked')
		$('.subnav .subnavLi .navLan').stop(true).slideUp()
	})
	$('.subnav .subnavLi .navLan').hover(function(){},function(){
		$(this).stop(true).slideUp()
		$('.subnav .subnavLi').removeClass('checked')
	})
	
	//轮播图
	var timer=null;
	var w=1347;
	var num=0;
	var speed=1000;
				
	$('.Bcon li').first().clone().appendTo('.Bcon')
				
	//右键
	$('.goR').click(function(){
		if (!$('.Bcon').is(':animated')) {
			if(num==$('.Bcon li').length-1){
				$('.Bcon').css('left','0px')
					num=0
				}
				num++;
				$('.Bcon').animate({
					'left':-w*num+'px'
				},speed)
			}
			changeNum(num)
	})
				
	//左键
	$('.goL').click(function(){
		if(!$('.Bcon').is(':animated')){
			if(num==0){
				$('.Bcon').css('left',-w*($('.Bcon li').length-1)+'px')
				num=$('.Bcon li').length-1
			}
			num--;
			$('.Bcon').animate({
				'left':-w*num+'px'
			},speed)
		}
		changeNum(num)
	})
				
	//btnNum
	function changeNum(index){
		if(index==$('.Bcon li').length-1){index=0}
		$('.btnNum li').eq(index).addClass('checked').siblings().removeClass('checked')
	}
				
	//自动轮播
	timer=setInterval(function(){
		$('.goR').click()
	},3000)
	$('.banner').hover(function(){
		clearInterval(timer)
		$('.banner div').show()
	},function(){
		timer=setInterval(function(){
			$('.goR').click()
		},3000)
		$('.banner div').hide()
	})
				
	//btnNumnav
	$('.btnNum li').click(function(){
		if (!$('.Bcon').is(':animated')) {
			var index=$(this).index();
			if (num>index) {
				$('.Bcon').css('left',-w*(index+1)+'px')
			}else if(num<index){
				$('.Bcon').css('left',-w*(index-1)+'px')
			}
			$('.Bcon').animate({
				'left':-w*index+'px'
			},speed)
			num=index
			changeNum(num)
		}
	})
	
	$(window).scroll(function(){
		var goTop=$(window).scrollTop()
			if (goTop>600) {
				$('.gotop').fadeIn(2000)
			}else{
				$('.gotop').fadeOut(2000)
			}
	})
	
	$('.gotop').click(function(){
		$('html,body').animate({
			scrollTop:'0px'
		},5000,'swing')
	})
	
////////
})