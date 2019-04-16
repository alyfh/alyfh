$(function(){
	var num=0,w=1000;
	
	//复制第一张图
	$('#lunboCon li').first().clone().appendTo('#lunboCon')
	
	//右键轮播
	$('#btnR').click(function(){
		if(!$('#lunboCon').is(':animated')){
			//先动画在判断
			num++;
			changNum(num)
			$('#lunboCon').animate({
				"left":-num*w+"px"
			},800,function(){
				if(num==$('#lunboCon li').length-1){
					num=0
					$('#lunboCon').css('left','0')
				}
			})
		}
	})
	
	//左键轮播
	$('#btnL').click(function(){
		if(!$('#lunboCon').is(':animated')){
			//先判断再动画
			if(num==0){
				$('#lunboCon').css('left',-($('#lunboCon li').length-1)*w+'px')
				num=$('#lunboCon li').length-1
			}
			
			num--
			changNum(num)
			$('#lunboCon').animate({
				"left":-num*w+"px"
			},800)
		}
	})
	
	//lunboNav 
	function changNum(num){
		if(num==$('#lunboCon li').length-1){num=0;}
		$('#lunboNav li').eq(num).addClass('checked').siblings().removeClass('checked')	
	}
	
	//自动轮播
	timer=setInterval(function(){
		$('#btnR').click()
	},3000)
	
	$('#lunbo').hover(function(){
		clearInterval(timer)
	},function(){
		timer=setInterval(function(){
			$('#btnR').click()
		},3000)
	})
	
	//Nav点
	$('#lunboNav li').click(function(){
		if(!$('#lunboCon').is(':animated')){
			var now=num;
			num=$(this).index()
			if(now>num){
				$('#lunboCon').css('left',-(num+1)*w+'px')
			}else if(now<num){
				$('#lunboCon').css('left',-(num-1)*w+'px')
			}
			$('#lunboCon').animate({
				"left":-num*w+'px'
			},1000)
			changNum(num)
		}
		
	})
})