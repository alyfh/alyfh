<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
   	$id=$_GET["id"];
	$url="http://api.douban.com/v2/movie/subject/".$id;
	// $url="http://api.douban.com/v2/movie/subject/1292052";
	$content = file_get_contents($url); 
	echo $content;
?>