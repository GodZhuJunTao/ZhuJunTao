<?php
	include 'connect.php';
	$user = isset($_POST['user']) ? $_POST['user'] : '1';
	$pwd = isset($_POST['paw']) ? $_POST['paw'] : '1';
//	echo $user;
//	echo $pwd;
	//写查询语句
	$sql= "SELECT * FROM user_inf WHERE name='$user' AND password='$pwd'";
	//执行语句
	$res= $conn->query($sql);
//	var_dump($res_n);
//	var_dump($res_p);
	if($res->num_rows > 0){
		echo 1;
	}else{
		echo 0;
	}
	$res->close();
	$conn->close();
?>