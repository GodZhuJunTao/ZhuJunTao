$(function(){
	
	/*
		渐现轮播图：
			1.把所有的图片放在框内，第一个图片display:block;显示
			2.开定时器：每次轮播一个图
			3.焦点跟随
			4.点击上下按钮可以切图
			5.点击焦点可以跳转
	 */
	
	//1.第一个图片display:block;显示
	$('.banner_cen .banner_img .li').eq(0).css('display','block');
	
	//2.开定时器：每次轮播一个图
	var adTimer=null;
	clearInterval(adTimer);
	var now=0;
	
	adTimer=setInterval(function(){
		adNext();
	},4000);//每隔4秒钟切换一个图
	
	function adNext(){
		$('.banner_cen .banner_img .li').eq(now).stop(true);//清除动画
		$('.banner_cen .banner_img .li').css('zIndex',-2);//防止底下的图片遮挡住上一张图
		//旧的z轴高度为-1，放低
		$('.banner_cen .banner_img .li').eq(now).css({'zIndex':-1,'display':'block'});
		var prev = now;
		now=++now>=$('.banner_cen .banner_img .li').size()?0:now;//若到最后一张，下一张为第一张
		fadeInSlide(now,prev);
		adLight();
	}
	
	//3.焦点跟随
	function adLight(){
		$('.banner_cen .banner_img ul li').removeClass('active');
		$('.banner_cen .banner_img ul li').eq(now).addClass('active');
	}
	
	function adPrev(){
		$('.banner_cen .banner_img .li').eq(now).stop(true);//清除动画
		$('.banner_cen .banner_img .li').css('zIndex',-2);//防止底下的图片遮挡住上一张图
		//旧的z轴高度为-1，放低
		$('.banner_cen .banner_img .li').eq(now).css({'zIndex':-1,'display':'block'});
		var prev = now;
		now=--now<0?$('.banner_cen .banner_img .li').size()-1:now;
		fadeInSlide(now,prev);
		adLight();
	}
	
	//4.点击上下按钮可以切图:如果是渲染出来的数据，记得用事件委托来绑定
	
	//鼠标经过停止，鼠标离开继续运动
	$('.banner_cen .banner_img').hover(function(){
		clearInterval(adTimer);
	},function(){
		clearInterval(adTimer);
		adTimer=setInterval(adNext,4000);
	});
	
	//点击切换到上一张
	$('.banner_cen .banner_img .img_prev').click(function(){
		adPrev();
	});
	
	//点击切换到下一张
	$('.banner_cen .banner_img .img_next').click(function(){
		//下一张
		adNext();
		console.log(122);
	});
	
	//5.点击焦点可以跳转
	
	$('.banner_cen .banner_img ul').on('click','li',function(){
		$('.banner_cen .banner_img .li').eq(now).stop(true);//清除动画
		$('.banner_cen .banner_img .li').css('zIndex',-2);//防止底下的图片遮挡住上一张图
		//旧 ：now
		//新：index() 新的
		var index=$(this).index();
		//旧的z轴高度为0，放低
		$('.banner_cen .banner_img .li').eq(now).css({'zIndex':-1,'display':'block'});
		var prev = now;//存上一张
		fadeInSlide(index,prev);
		now=index;//最新的一张变成index
		adLight();
	});

	//封装图片渐现函数
	function fadeInSlide(now,prev){
		//新的快速提升z轴高度为10，再渐现
		$('.banner_cen .banner_img .li').eq(now).css({'zIndex':0,'display':'block','opacity':0});
		$('.banner_cen .banner_img .li').eq(now).animate({'opacity':1},1000,function(){
			$('.banner_cen .banner_img .li').eq(prev).css('display','none');
		});
	}
	

	/*
	 	秒杀轮播图：每次运动4个图距离，运动出去的图片，剪切拼接到末尾
	 	
	 	1、ul的宽度：图片的宽度*图片个数
	 	2、出去的图片剪切拼接到后面
	 	3、上下按钮可以点击切换
	 */
	
	//1、ul的宽度：图片的宽度*图片个数
	var killNum=$('.banner_cen .banner_img_two .li_two').size()*$('.banner_cen .banner_img_two .li_two').eq(0).outerWidth();
	$('.banner_cen .banner_img_two').css('width',killNum);
	var killW=$('.banner_cen .banner_img_two .li_two').eq(0).outerWidth()*3;//运动距离
	
	function killNext(){
		$('.banner_cen .banner_img_two').animate({'left':-killW},500,function(){
			//出去的图片，剪切放到末尾
			$('.banner_cen .banner_img_two .li_two:lt(3)').insertAfter($('.banner_cen .banner_img_two .li_two:last'));
			//ul归位
			$('.banner_cen .banner_img_two').css('left',0);
		});
	}
	
	function killPrev(){
		//先剪切最后的四个图插入到ul首位
		for(var i=0;i<3;i++){
			$('.banner_cen .banner_img_two .li_two:last').insertBefore($('.banner_cen .banner_img_two .li_two:first'));
		}
		//预留4个图位置
		$('.banner_cen .banner_img_two').css('left',-killW);
		//挪到可视区
		$('.banner_cen .banner_img_two').animate({'left':0},500);
	}
	//2.开定时器：每次轮播一个图
	var TwoTimer=null;
	clearInterval(TwoTimer);
	var now=0;
	
	TwoTimer=setInterval(function(){
		killNext();
	},6000);//每隔4秒钟切换一个图
	//点击切换下一页：四张图
	$('.banner_cen .banner_img_two .imgTwo_next').click(function(){
		killNext();
	});
	
	$('.banner_cen .banner_img_two .imgTwo_prev').click(function(){
		killPrev();
		console.log(123);
	});
	//鼠标经过停止，鼠标离开继续运动
	$('.banner_cen .banner_img_two').hover(function(){
		clearInterval(TwoTimer);
	},function(){
		clearInterval(TwoTimer);
		TwoTimer=setInterval(killNext,6000);
	});
});
