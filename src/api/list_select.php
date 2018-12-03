<?php
	include 'connect.php';
	$sql = "select * from `order`";
	$res = $conn->query($sql);
//	var_dump($res);
	$data = $res->fetch_all(MYSQLI_ASSOC);
//	var_dump($data);
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
	$res->close();//关掉结果集
	$conn->close();//断开连接
?>