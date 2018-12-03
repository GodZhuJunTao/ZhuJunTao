<?php
	include 'connect.php';
	$user = isset($_GET['username']) ? $_GET['username'] : '18870487543';
//	echo $user;
	//写查询语句;
	$sql = "SELECT * FROM user_inf WHERE name='$user'";
	//执行语句;
	$res = $conn->query($sql);
//	var_dump($res);
	if($res->num_rows>0){
		echo 1;
	}else{
		echo 0;
	}
	$res->close();
	$conn->close();
?>