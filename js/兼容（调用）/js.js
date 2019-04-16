  function $(ID){  
return document.getElementById(ID);
}
function getTagName(obj,na){
    return obj.getElementsByTagName(na)
}
function getName(N){
    return obj.getElementsByName(N)
}
function getClass(obj,className){

if(obj.getElementsByClassName){
return obj.getElementsByClassName(className);
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
function getStyle(obj,attr){
if(obj.currentStyle){
  
 return parseFloat(obj.currentStyle[attr]);
}else{
   return parseFloat(getComputedStyle(obj,false)[attr]);
}
}

function firstChild(obj){
if(obj.firstElementChild){
   return obj.firstElementChild
}else{
    return obj.firstChild
}
}

function nextSibling(obj){
if(obj.nextElementSibling){
   return obj.nextElementSibling
}else{
    return obj.nextSibling
}
}
function nextS(obj,tag){
    while(true){
        if(obj.nextSibling.nodeName==tag.toUpperCase()){
            return obj.nextSibling;
        }else{
            obj=obj.nextSibling
        }
    }
}
function previousSibling(obj){
if(obj.previousElementSibling){
   return obj.previousElementSibling
}else{
    return obj.previousSibling
}
}



var timer=null;
var speed=0;
function move(obj,L,attr){
    var opa=0
     clearInterval(obj.timer)
    obj.timer=setInterval(function (){
        speed=(L-getStyle(obj,attr))/7;
        speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);
        if(getStyle(obj,attr)==L){
            clearInterval(obj.timer)}
            else{


        if(attr=='opacity'){
          obj.style[attr]=opa/100   
        }else{        
      obj.style[attr]=getStyle(obj,attr)+speed+'px';
}

       }
       opa=opa+2
    },26)
}

function addEvent(obj,c,fn){
    if(obj.addEventListener){
    obj.addEventListener(c, fn, true);
}else{
   obj.attachEvent('on'+c,fn) 
}
}

function delectEvent(obj,fn,b){
  if(obj.removeEventListener){
    return obj.removeEventListener(c,fn,b)
}else{
    return obj.detachEvent(c,fn)
}
}