<?php
    header("Content-Type:text/html;charset=utf-8");  //设置字符编码
  $url="http://api.laifudao.com/open/tupian.json";
  $content = file_get_contents($url); 
  echo $content;
?>