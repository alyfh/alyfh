<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
   	$q=$_GET["q"];
	$url="http://api.douban.com/v2/movie/search?q=".$q;
	$content = file_get_contents($url); 
	echo $content;
?>