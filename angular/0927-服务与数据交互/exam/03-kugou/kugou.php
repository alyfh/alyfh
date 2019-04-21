<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
   	$hash=$_GET["hash"];
	$url='http://m.kugou.com/app/i/getSongInfo.php?hash='.$hash.'&cmd=playInfo ';
	$content = file_get_contents($url); 
	echo $content;
?>