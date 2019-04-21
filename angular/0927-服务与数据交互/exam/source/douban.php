<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
	$url="http://api.douban.com/v2/movie/top250";
	$content = file_get_contents($url); 
	echo $content;
?>