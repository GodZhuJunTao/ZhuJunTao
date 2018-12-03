TabControl('banner_r_top','banner_active',2);
function banner_b_hot(){
	var oBox=document.querySelector('.banner_bottom .banner_b_hot div ul');
	var A=oBox.querySelectorAll('li');
	var aDivs=oBox.querySelectorAll('div');
		//循环绑定事件
	for(var i=0;i<A.length;i++){
		A[i].index=i;//添加索引，做一个标识，点击的时候就可以知道我点的是第几个了
		//第二种:滑过
		A[i].onmousemove=function(){
		//排他:清空
		for(var i=0;i<A.length;i++){
			A[i].className='';
			aDivs[i].style.display='none';
		}
			this.className='banner_b_hot_active';
			aDivs[this.index].style.display='block';
		}
	}
}
banner_b_hot();
function floor_c(id,id2,active){
	var A=document.querySelectorAll(id);
	var aDivs=document.querySelectorAll(id2);
		//循环绑定事件
	for(var i=0;i<A.length;i++){
		A[i].index=i;//添加索引，做一个标识，点击的时候就可以知道我点的是第几个了
		//第二种:滑过
		A[i].onmousemove=function(){
		//排他:清空
		for(var i=0;i<A.length;i++){
			A[i].className='';
			aDivs[i].style.display='none';
		}
			this.className=active;
			aDivs[this.index].style.display='block';
		}
	}
}
floor_c('.floor_1_top ul li','.floor_1_c','floor_active');
floor_c('.floor_2_top ul li','.floor_2_c','floor_2_active');
/*
		渐现轮播图：
			1.把所有的图片放在框内，第一个图片display:block;显示
			2.开定时器：每次轮播一个图
			3.焦点跟随
			4.点击上下按钮可以切图
			5.点击焦点可以跳转
	 */
	
	//1.第一个图片display:block;显示
	var now = 0;
	$('#banner_r_top div img').eq(0).css('display','block');
	
	//3.焦点跟随
	function adLight(){
		$('#banner_r_top div ul li').removeClass('small_active');
		$('#banner_r_top div ul li').eq(now).addClass('small_active');
	}
	//5.点击焦点可以跳转
	
	$('#banner_r_top div ul').on('click','li',function(){
		$('#banner_r_top div img').eq(now).stop(true);//清除动画
		$('#banner_r_top div img').css('zIndex',-2);//防止底下的图片遮挡住上一张图
		//旧 ：now
		//新：index() 新的
		var index=$(this).index();
		//旧的z轴高度为0，放低
		$('#banner_r_top div img').eq(now).css({'zIndex':-1,'display':'block'});
		var prev = now;//存上一张
		fadeInSlide(index,prev);
		now=index;//最新的一张变成index
		adLight();
	});

	//封装图片渐现函数
	function fadeInSlide(now,prev){
		//新的快速提升z轴高度为10，再渐现
		$('#banner_r_top div img').eq(now).css({'zIndex':0,'display':'block','opacity':0});
		$('#banner_r_top div img').eq(now).animate({'opacity':1},500,function(){
			$('#banner_r_top div img').eq(prev).css('display','none');
		});
	}
$('.banner_b_hot div ul div dl dt span img').hover(function(){
	$(this).animate({'left':'15px'},100);
},function(){
	$(this).animate({'left':'25px'},100);
});
//回到顶部
ScrollToTOP('ad_top',1);
//下拉菜单
//$('.jianyi').mousemove(function(){
//	$('.jianyi ul').slideToggle();//slideDown和slideUp合体
//});
selectMenu('jianyi',2);
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
	window.open('html/login.html');
});
$('#reg').click(function(){
	window.open('html/reg.html');
});
//跳转到购物车
$('#tiaocar').click(function(){
	console.log(123)
	window.open('html/shopcar.html');
});
//获取订单表的条数
function upcar(){
	var url = 'api/list_select.php';
	ajax('GET',url,'',function(str){
		var arr = JSON.parse(str);
		$('.cartcount span').html(arr.length);
	});
}
upcar();
