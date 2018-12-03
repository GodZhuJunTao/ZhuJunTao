<?php
/*
    点击加入购物车，先查询订单表，然后更新订单表
        get:
            id:商品id
            num：商品数量
        返回：
            订单表的所有数量
 */

    //加入购物车，把数据写入订单表
    include 'connect.php';

    $num=isset($_GET['num']) ? $_GET['num'] : '1';
    $id=isset($_GET['id']) ? $_GET['id'] : '2';

    //查询订单表是否有该id商品
    $sql="SELECT num FROM `order` WHERE id='$id'";
    $res=$conn->query($sql);
    

    if($res->num_rows>0){
        $data = $res->fetch_all(MYSQLI_ASSOC);
        $gnum = $data[0]['num'];
        $num = $num + $gnum;
        $sql2="UPDATE `order` SET num=$num WHERE id=$id";
        $res2=$conn->query($sql2);
    }else{
        $sql3="SELECT * FROM  shoppinglist WHERE id=$id";
        $res3=$conn->query($sql3);
        // var_dump($res3);
        $data3=$res3->fetch_all(MYSQLI_ASSOC);
        // var_dump($data3[0]);
        // echo $data3[0]['name'];
        $gname = $data3[0]['shopname'];
        $gprice = $data3[0]['price'];
		$gurl = $data3[0]['url'];
        // echo $id,$gname,$gprice,$num;

        $sql4="INSERT INTO `order`(id,shopname,price,num,url) VALUES ('$id','$gname','$gprice','$num','$gurl')";
        $res4=$conn->query($sql4);
    }
    $sql5="SELECT * FROM `order`";
    $res5=$conn->query($sql5);
    $data2=$res5->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($data2,JSON_UNESCAPED_UNICODE);
    

?>