<?php
/*
****************************************************

	url:	form.php?user=用户名&pass=密码
		
	return:	'登陆成功'
			'账号密码不能为空'
			'账号错误'
			'密码错误'

****************************************************
*/
$user=$_GET["user"];
$pass=$_GET["pass"];


if ($user=="liyilin"&&$pass=="22222"){
	echo '登陆成功'; 
}else{
	if ($user==""||$pass=="") {
		echo '账号密码不能为空';
	} else if ($user!="liyilin"){
		echo '账号错误';
	}else if ($pass!="22222"){
		echo '密码错误';
	};
};

?>
