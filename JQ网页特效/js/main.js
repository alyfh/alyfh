$(function(){
	
	function lan(className,classNameimg,classNamep,yyhz,gbsz,ysz,classNameSpan,spanSz,spanySz){
		$(className).hover(function(){
			$(classNameimg).animate({
				"margin-left":'-15px'
			},600,"swing")
			$(yyhz).show()
			$(classNamep).animate({
				"bottom":gbsz
			},600,"swing")
			$(classNameSpan).show().animate({
				"bottom":spanSz
			},600,"swing")
			return false
		},function(){
			$(classNameimg).animate({
				"margin-left":'0px'
			},600,"swing")
			$(yyhz).hide()
			$(classNamep).animate({
				"bottom":ysz
			},600,"swing")
			$(classNameSpan).hide().animate({
				"bottom":spanySz
			},600,"swing")
			return false
		})
	}
	lan('.lan','.lan img','.lan p','.lan .yyhz','70px','50px')
	lan('.lanf','.lanf img','.lanf p','.lanf .yyhz','105px','90px','.lanf span','15px','-20px')
	lan('.lans','.lans img','.lans p','.lans .yyhz','80px','60px','.lans span','40px','20px')
	lan('.lanl','.lanl img','.lanl p','.lanl .yyhz','105px','90px','.lanl span','15px','-20px')
	lan('.lanr','.lanr img','.lanr p','.lanr .yyhz','120px','110px','.lanr span','5px','-30px')

////////
})