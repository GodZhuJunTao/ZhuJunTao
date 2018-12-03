<?php
	include 'connect.php';
	$user = isset($_POST['name']) ? $_POST['name'] : '1';
	$pasw = isset($_POST['pwd']) ? $_POST['pwd'] : '1';
//	echo $user;
//	echo $pasw;
	//写查询语句;
	$sql = "INSERT INTO user_inf(name,password) values('$user','$pasw')";
	//执行语句
	$res = $conn->query($sql);
	if($res){
		echo 'yes';
	}else{
		echo 'no';
	}
	$conn->close();
?>