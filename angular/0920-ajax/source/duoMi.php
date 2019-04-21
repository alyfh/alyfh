<?php
   	header("Content-Type:text/html;charset=utf-8");  //设置字符编码
	$kw=$_GET["kw"];//关键词
	$pi=$_GET["pi"];//页码
	$pz=$_GET["pz"];//每页音乐数
	$url="http://v5.pc.duomi.com/search-ajaxsearch-searchall?kw=".$kw."&pi=".$pi."&pz=".$pz;
	$content = file_get_contents($url); 
	echo $content;
?>