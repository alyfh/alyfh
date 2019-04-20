<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
	$city = $_GET["city"];
	$url="http://api.map.baidu.com/telematics/v3/weather?location=".$city."&output=json&ak=OKUlj6dcVAa8ZscuCtRWVrL8&mcode=com.hudong.dingding";
	$content = file_get_contents($url); 
	echo $content;
?>