$(function() {

	/*
	 需求：
	 	* 加数量
	 	* 减数量
	 	* 删除当行
	 	* 小计
	 	* 全选
	 	* 总数量和总价跟着变
	
	*/

	//查询订单表的数据，渲染到购物车：建议用字符串模板
	var cart = document.querySelector('#tr135149-0');
	var arr = [];
	function car(){
		var url = '../api/list_select.php';
		ajax('GET',url,'',function(str){
			var arr = JSON.parse(str);
			var html='';
			for(var i=0;i<arr.length;i++){
				html+=`<tr>
							<td colspan="8" class="shopcart_yhwrap">
								<div class="yhnews">
									<span>包裹${i+1}</span>
								</div>
							</td>
						</tr>
						<tr class="bgcolxz" data-id="${arr[i].id}">
							<td width="40%">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr>
											<td style="text-align: left; border: none;">
												<input type="checkbox" value="135149-0" name="checkGoods" checked="checked" class="checkGoods">
												<input type="hidden" id="jf135149" value="0">
											</td>
											<td style="text-align: left; border: none;">
												<div class="process-01">
													<a target="_blank" href="https://www.j1.com/product/121918-135149.html">
														<img style="width: 88px; height: 88px;" src="${arr[i].url}">
													</a>
												</div>
											</td>
											<td style="text-align: left; border: none;">
												<div class="process-02">
													<a target="_blank" href="https://www.j1.com/product/121918-135149.html">
														${arr[i].shopname}   
													</a>
													<a href="#" class="orange" style="font-weight: bold;"> </a>
													<input type="hidden" id="sku135149-0" value="0">
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td width="8%">06-04203</td>
							<td width="8%">3531</td>
							<td width="10%">深圳伟嘉家电有限公司</td>
							<td width="8%">
								<span style="color:#c40000;font-size:14px;" id="jyj135149-0">${arr[i].price}</span>
							</td>
							<td width="10%">
								<div class="process-num clearfix">
									<div class="process-num_01">
										<a class="shopcart-btn cutnum" style="text-decoration: none;">-</a>
									</div>
									<input style="width: 30px" name="orderAmount" id="orderAmount135149-0" min-amount="1" max-amount="100" promote-amount="0.00" type="text" class="process-num_02" value="${arr[i].num}">
									<div class="process-num_01">
										<a class="shopcart-btn addnum" style="text-decoration: none;">+</a>
									</div>
								</div>
							</td>
							<td width="8%">
								<span id="sum135149-0" class="sum">${arr[i].price*arr[i].num}</span>
							</td>
							<td> &nbsp; <a href="#" class="good_del">删除</a></td>
						</tr>`;
			}
			cart.innerHTML += html;
			total();
		});
	}
	car();
	//加数量:事件委托方式
	$('#tr135149-0').on('click', '.addnum', function() {
		//点击获取对应行的数量，加1在赋值
		var val = $(this).parent().prev().val();
		var id = $(this).parent().parent().parent().parent().attr('data-id');
		val++;
		if (val >= 100) { //库存量
			val = 100;
		}
		$(this).parent().prev().val(val);
		//接口：更新数据库数量
		var url = '../api/CarNum.php';
		var data = `id=${id}&num=${val}`;
		ajax('GET',url,data,function(str){
			console.log(str);
		});
		subTotal($(this)); //刷新合计
		total();
	});
	//减去数量
	$('#tr135149-0').on('click', '.cutnum', function() {
		//点击获取对应行的数量，加1在赋值
		var val = $(this).parent().next().val();
		var id = $(this).parent().parent().parent().parent().attr('data-id');
		val--;
		if (val <= 1) { //库存量
			val = 1;
		}
		//接口：更新数据库数量
		$(this).parent().next().val(val);
		var url = '../api/CarNum.php';
		var data = `id=${id}&num=${val}`;
		ajax('GET',url,data,function(str){
			console.log(str);
		});
		subTotal($(this)); //刷新合计
		total();
	});
	function subTotal(now) { //合计
		var num = now.parent().parent().find('input').val(); //数量
		var price = now.parent().parent().parent().prev().children().text();
		price = $.trim(price); //工具方法：去除前后空格
//		console.log(num,price);
		var all = (num * price); //保留两个小数，小计：数量*单价
		now.parent().parent().parent().next().children().html(all);
		total();
	}
	//删除当行
	$('#tr135149-0').on('click', '.good_del', function() {
		var mes = confirm('您确定要删除该行吗？');
		if (mes) {
			$(this).parent().parent().prev().remove();
			$(this).parent().parent().remove();
//			var id = $(this).parent().parent().attr('data-id');
//			$.ajax({
//				type:"get",
//				url:"../api/delline.php",//接口路径
//				async:true,//异步
//				data:{//传输数据
//					'id':id
//				},
//				success:function(str){//成功回调
//					console.log(str);
//				}
//			});
			//接口：删除数据库的某行
		}
		update(); //最后一行是否显示判断
		total();
	});
	//更新状态
	function update() {
		if ($('.addnum').size() == 0) {
			//意味着没有商品数据了
			$('.settlement').css('display', 'none');
			$('#shopcart-con').css('display', 'none');
			$('#none').css('display', 'block');
		}
	}
	//全选
	var isok = false;
	$('#checkAll').on('click', function() {
		if (isok) {
			//全选 attr()只能帮到普通属性  id class title ;prop()添加有行为的属性：一般用在单选和复选框
			$(this).prop('checked', 'checked');
			$('.checkGoods').prop('checked', 'checked');
			total();
		} else {
			//不选
			$(this).removeAttr('checked');
			$('.checkGoods').removeAttr('checked');
//			$('#totalprice').html('总计（不含运费）：￥0.00');
//			$('#allnum').html('已选 0 件商品');
			$('.shopcart-tuijian-price02').html(0);
			$('#sumAmount').html(0);
			$('.pr20 i').html(0);
		}
		isok = !isok;
	});
//	total();
	//总计
	var Newnum = 0;
	function total() {
		var total = 0;
		var res = '0.00';
		var num = 0;
		var newnum =0 ;
		var heji = document.querySelectorAll('.sum');
		var zongji = document.querySelectorAll('.process-num_02')
		for(var i=0;i < $('#tr135149-0 .sum').length; i++){
			if($('#tr135149-0 tr').eq(i*3+3).find('.checkGoods').prop('checked')){
				total += (heji[i].innerHTML)* 1;
				var res = total;
				num+=(zongji[i].value)*1;
				newnum++;
			}
		}
		Newnum = newnum;
		$('.shopcart-tuijian-price02').html(res);
		$('#sumAmount').html(num);
		$('.pr20 i').html(num);
	}
	$('#tr135149-0').on('click','.checkGoods',function(){
		total();
		$(this).parent().parent().parent().parent().parent().parent().toggleClass('bgcolxz');
		if(Newnum==$('.checkGoods').size()){
			$('#checkAll').prop('checked', 'checked');
			isok = false;
		}else{
			$('#checkAll').removeAttr('checked');
			isok = true;
		}
	});
	//全删
	$('#Alldel').on('click', function() {
		//空数组：存被勾选的行的下标
		arr.length = 0;
		var le = $('.checkGoods').size(); //复选框的总个数
		for(var i = 0; i < le; i++) {
			if($('#tr135149-0 tr').eq(i*3+3).find('.checkGoods').prop('checked')) {
				//意味着这一行被勾选
				arr.push(i);
			}
		}
		if(arr.length>0){
			var mes = confirm('您确定要删除多行吗？');
			var strId = '';
			if(mes) {
				for(var i=0;i<arr.length;i++){
					strId += $('.checkGoods').eq(arr[i]).parent().parent().parent().parent().parent().parent().attr('data-id')+',';
				}
				console.log(strId);
				strId = strId.slice(0,-1);
				$.ajax({
					type:"get",
					url:"../api/delline.php",//接口路径
					async:true,//异步
					data:{//传输数据
						'id':strId
					},
					success:function(str){//成功回调
						console.log(str);
					}
				});
				for(var i = arr.length - 1; i >= 0; i--) { //找到对应的行，删除
					$('.checkGoods').eq(arr[i]).parent().parent().parent().parent().parent().parent().prev().remove();
					$('.checkGoods').eq(arr[i]).parent().parent().parent().parent().parent().parent().remove();
					$('.checkGoods').eq(arr[i]).parent().parent().parent().parent().parent().parent().attr('data-id');
					//接口3：删除数据库订单表多条数据
					
				}
			}
		}
		total();
		update();
	});
});