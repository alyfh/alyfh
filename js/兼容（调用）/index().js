//兼容
function getStyle(obj,arrt){
	if(obj.currentStyle){
        return parseFloat(obj.currentStyle[arrt])
	}else{
     	return parseFloat(getComputedStyle(obj,false)[arrt])
    }
}	
	
//分享
var timer=null;
var speed=0;
	
	function move(obj,lan,attr){
		var opa=0;
		clearInterval(obj.timer)
		obj.timer=setInterval(function(){
			speed=(lan-getStyle(obj,attr))/7
			speed>0?speed=Math.ceil(speed):speed=Math.floor(speed)
			if(getStyle(obj,attr)==lan){
				clearInterval(obj.timer)
			}else{
				
				if(attr=='opacity'){
					obj.style[attr]=opa/100
				}else{
					obj.style[attr]=getStyle(obj,attr)+speed+'px'
				}
				opa=opa+2
			}
		},26)
	}
	
//nextS
function nextS(obj,tag){
    while(true){
        if(obj.nextSibling.nodeName==tag.toUpperCase()){
            return obj.nextSibling;
        }else{
            obj=obj.nextSibling
        }
    }
}

//getClass
function getClass(obj,className){
		if(obj.getElementsByClassName){
		return obj.getElementsByClassName(className)
	}else{
		var All=obj.getElementsByTagName('*')
		var nav=[]
		for(var i=0;i<All.length;i++){
			if(All[i].className==className){
				nav.push(All[i])
			}
		}
		return nav;
	}
	}

//getTagName
function getTagName(obj,na){
	return obj.getElementsByTagName(na)
}

//getName
function getName(N){
	return obj.getElementsByName(N)
}

//firstChild
function firstChild(obj){
		if(obj.firstElementChild){
		return obj.firstElementChild
	}{
		return obj.firstChild
	}
	}

//ID
function $(ID){
    	return document.getElementById(ID);
    }

//addEventListener  事件绑定
	function addEvent(obj,c,fn){
		if(obj.addEventListener){
			obj.addEventListener(c,fn,true)
		}else{
		obj.attachEvent('on'+c,fn)
		}
	}
	
//	function delectEvent(obj,c,fn){
//		if(obj.removeEventListener){
//			return obj.removeEventListener(c,fn,true)
//		}else{
//			return obj.detachEvent('on'+c,fn)
//		}
//	}