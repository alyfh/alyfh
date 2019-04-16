
window.onload=function (){
    var oTop=document.getElementById('top');
    var oRight=document.getElementById('rightf');
    var oBot=document.getElementById('bottom');

    oTop.onmouseover=function (){
        this.children[1].style.display='block' ;
        oRight.style.display='block'} ;
    oTop.onmousemove=function (ev){
        var ev=event||ev ;
        this.children[1].style.left=ev.clientX-oTop.offsetLeft-this.children[1].offsetWidth/2+'px' ;
        this.children[1].style.top=ev.clientY-oTop.offsetTop-this.children[1].offsetHeight/2+'px' ;

        var obj=this.children[1];
        if(obj.offsetLeft<0){
            obj.style.left=0
        }
        if(obj.offsetLeft>(oTop.offsetWidth-obj.offsetWidth)){
            obj.style.left=oTop.offsetWidth-obj.offsetWidth+'px'
        }
        if(obj.offsetTop<0){
            obj.style.top=0
        }

        if(obj.offsetTop>(oTop.offsetHeight-obj.offsetHeight)){
            obj.style.top=oTop.offsetHeight-obj.offsetHeight+'px'
        }
        var s=obj.offsetLeft/(oTop.offsetWidth-obj.offsetWidth) ;
        var c=obj.offsetTop/(oTop.offsetHeight-obj.offsetHeight);
        oRight.children[0].style.left=-(oRight.children[0].offsetWidth-oRight.offsetWidth)*s+'px';

        oRight.children[0].style.top=-(oRight.children[0].offsetHeight-oRight.offsetHeight)*c+'px'


    };

    oTop.onmouseout=function (){
        this.children[1].style.display='none';
        oRight.style.display='none'
    }




    var img=oBot.getElementsByTagName('img');
    for(var i=0;i<img.length;i++){
        img[i].onclick=function (){
            oRight.children[0].src=oTop.children[0].src=this.getAttribute('src');

        }
    }


    
}



