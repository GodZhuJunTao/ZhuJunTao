<?php
	include 'connect.php';
	$id = isset($_GET['id']) ? $_GET['id'] : '1';
	$num = isset($_GET['num']) ? $_GET['num'] : '5';
	$sql = "UPDATE `order` set num='$num' WHERE id='$id'";
	$res =$conn->query($sql);
//	var_dump($res);
	if($res){
		echo '成功';
	}else{
		echo '失败';
	}	
?>