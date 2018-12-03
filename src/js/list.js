//下拉菜单
selectMenu('jianyi',2);
//回到顶部
ScrollToTOP('ad_top',1);
//获取cookic,欢迎来到首页
function delcookie(){
	var name = Cookie.get('user');
	if(name){
		$('.top_right ul li:last').html('欢迎&nbsp;'+'<a style="cursor:pointer;">'+name+'</a>'+'&nbsp;来到我的首页'+'<a style="cursor:pointer;color:blue;" id="exit">退出</a>');
	}else{
		$('.top_right ul li:last').html('您好&nbsp;,&nbsp;&nbsp;欢迎来到建一网网上药店！&nbsp;[<a href="javascript:;" id="login">登录</a>]&nbsp;[<a href="javascript:;" id="reg">注册</a>]')
	}
}
delcookie();
$('#exit').click(function(){
	Cookie.remove('user','/ZhuJunTao/src/');
	delcookie();
});
$('#login').click(function(){
	window.open('login.html');
});
$('#reg').click(function(){
	window.open('reg.html');
});
//跳转到购物车
$('#tiaocar').click(function(){
	window.open('shopcar.html');
});
//获取订单表的条数
function upcar(){
	var url = '../api/list_select.php';
	ajax('GET',url,'',function(str){
		var arr = JSON.parse(str);
		$('.cartcount span').html(arr.length);
	});
}
upcar();
//渲染数据
$(function(){
	//把渲染封装成一个函数
	function creat(arr){
		var html = '';
		for(var i=0;i<arr.datalist.length;i++){
			html += `<li data-id="${arr.datalist[i].id}">
						<img src="${arr.datalist[i].url}"/>
						<a href="javascript:;">  ${arr.datalist[i].shopname}  </a><br />
						<span>￥${arr.datalist[i].price}</span>
						<span>总销量 : ${arr.datalist[i].sales}</span>
						<a href="javascript:;">${arr.datalist[i].comment}条评论</a>
						<a href="javascript:;" class="setcar"><span></span>加入购物车</a>
						<a href="javascript:;" class="select">查看详情</a>
					</li>`
		}
		$('.list').html(html);
	}
	var url = '../api/02sortGoodlist.php';
	var data = `page=1&qty=16&inf=id&desc=desc&time = new Date()`;
	ajax('GET',url,data,function(str){
		var arr = JSON.parse(str);
		console.log(arr);
		creat(arr);
		$('.list_r_b_r span').eq(0).html('共'+arr.total+'个商品');
		$('.listPage span:first').html('共'+arr.total+'条:');
		var con = '';
		var num = Math.ceil(arr.total/arr.qty);
		for(var i=0;i<num;i++){
			con+=`<em>${i+1}</em>`;
		}
		$('#qty').html(con);
		$('#qty em').eq(0).addClass('qty_active');
		$('.list_r_b_r span').eq(1).html($('#qty .qty_active').html()+'/'+num);
	});
	//点击换页
	$('#qty').on('click','em',function(){
		var inf = $('.list_r_b_l .sort_active').attr('id');
		console.log(inf);
		g_qty($(this),inf);
	});
	$('.prev').click(function(){
		var num = $('#qty .qty_active').html();
		var inf = $('.list_r_b_l .sort_active').attr('id');
		if(num == 1){
			num =1;
		}else{
			num--;
		}
		prev_next(num,inf);
	});
	$('.next').click(function(){
		var num = $('#qty .qty_active').html();
		var inf = $('.list_r_b_l .sort_active').attr('id');
		if(num == 4){
			num =4;
		}else{
			num++;
		}
		prev_next(num,inf);
	});
	//封装上一页下一页
	function g_qty(id,inf){
		var this_num = $(id).html();
		console.log(this_num);
		var url = '../api/02sortGoodlist.php';
		var data = `page=${this_num}&qty=16&inf=${inf}&desc=desc&time = new Date()`;
		ajax('GET',url,data,function(str){
			var arr = JSON.parse(str);
			creat(arr);
			var num = Math.ceil(arr.total/arr.qty);
			for(var i=0;i<num;i++){
				$('#qty em').eq(i).removeClass('qty_active');
			}
			var new_thisnum = this_num-1;
			$('#qty em').eq(new_thisnum).addClass('qty_active');
			$('.list_r_b_r span').eq(1).html($('#qty .qty_active').html()+'/'+num);
		});
	}
	function prev_next(number,inf){
		var url = '../api/02sortGoodlist.php';
		var data = `page=${number}&qty=16&inf=${inf}&desc=desc&time = new Date()`;
		ajax('GET',url,data,function(str){
			var arr = JSON.parse(str);
			creat(arr);
			var num = Math.ceil(arr.total/arr.qty);
			for(var i=0;i<num;i++){
				$('#qty em').eq(i).removeClass('qty_active');
			}
			var new_thisnum = number-1;
			$('#qty em').eq(new_thisnum).addClass('qty_active');
			$('.list_r_b_r span').eq(1).html($('#qty .qty_active').html()+'/'+num);
		});
	}
	//点击排序
	function list_sort(inf){
		for(var i=0;i<4;i++){
			$('.list_r_b_l a').eq(i).removeClass('sort_active');
		}
		var url = '../api/02sortGoodlist.php';
		var data = `page=1&qty=16&inf=${inf}&desc=desc&time = new Date()`;
		ajax('GET',url,data,function(str){
			var arr = JSON.parse(str);
			console.log(arr);
			creat(arr);
		});
	}
	$('#id').click(function(){
		var inf = $(this).attr('id');
		list_sort(inf);
		$(this).addClass('sort_active');
	});
	$('#sales').click(function(){
		var inf = $(this).attr('id');
		list_sort(inf);
		$(this).addClass('sort_active');
	});
	$('#comment').click(function(){
		var inf = $(this).attr('id');
		list_sort(inf);
		$(this).addClass('sort_active');
	});
	$('#price').click(function(){
		var inf = $(this).attr('id');
		list_sort(inf);
		$(this).addClass('sort_active');
	});
	$('#time').click(function(){
		var inf = $(this).attr('id');
		list_sort(inf);
		$(this).addClass('sort_active');
	});
	//加入购物车
	$('.list').on('click','.setcar',function(){
		var oid = $(this).parent().attr('data-id');
		var url = '../api/11newOrders.php';
		var data = `id=${oid}&num=1&time = new Date()`;
		ajax('GET',url,data,function(str){
			console.log(str);
			upcar();
		});
	});
	//跳转到详情页
	$('.list').on('click','.select',function(){
		var oid = $(this).parent().attr('data-id');
		window.open('detail.html?id='+oid);
	});
});
