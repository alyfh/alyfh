<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
	$wd = $_GET["wd"];
	$url="http://suggestion.baidu.com/su?wd=".$wd;
	$content = file_get_contents($url); 
	echo $content;
?>