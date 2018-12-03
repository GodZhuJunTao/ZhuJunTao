$(function(){
	var isok_usn = false;
	var isok_paw = false;
	var isok_Tpaw = false;
	var isok_auth = false;
	var isok_readme = true;
	//验证用户名 bk-error ts-error  correct
	$('#mobile').blur(function(){
		isok_usn = false;
		var val = $('#mobile').val();
		val = $.trim(val);
		if(val){
			if(checkReg.tel(val)){
				var url = '../api/register.php';
				var data = `username=${val}&time=${new Date()}`;
				ajax('GET',url,data,function(str){
					console.log(str);
					if(str == 1){
						$('#mobile').addClass('bk-error');
						$('#mobile').next().text('该用户名已有人使用');
						$('#mobile').next().addClass('ts-error');
						$('#mobile').next().next().removeClass('correct');
					}else{
						isok_usn = true;
						$('#mobile').next().next().addClass('correct');
						$('#mobile').next().text('');
						$('#mobile').next().removeClass('ts-error');
						$('#mobile').removeClass('bk-error');
					}
				});
			}else{
				$('#mobile').next().next().removeClass('correct');
				$('#mobile').addClass('bk-error');
				$('#mobile').next().text('您输入的号码格式不正确');
				$('#mobile').next().addClass('ts-error');
			}
		}else{
			$('#mobile').next().next().removeClass('correct');
			$('#mobile').addClass('bk-error');
			$('#mobile').next().text('用户名不能为空');
			$('#mobile').next().addClass('ts-error');
		}
	});
	//设置密码
	$('.jsszmm').blur(function(){
		isok_paw = false;
		var val = $('.jsszmm').val();
		val = $.trim(val);
		if(val){
			if(checkReg.strongpaw(val)){
				isok_paw= true;
				$('.jsszmm').next().next().addClass('correct');
				$('.jsszmm').next().text('');
				$('.jsszmm').next().removeClass('ts-error');
				$('.jsszmm').removeClass('bk-error');
				
			}else{
				$('.jsszmm').next().next().removeClass('correct');
				$('.jsszmm').addClass('bk-error');
				$('.jsszmm').next().text('您输入的密码格式不正确');
				$('.jsszmm').next().addClass('ts-error');
			}
		}else{
			$('.jsszmm').next().next().removeClass('correct');
			$('.jsszmm').addClass('bk-error');
			$('.jsszmm').next().text('密码不能为空');
			$('.jsszmm').next().addClass('ts-error');
		}
	});
	//再次确认密码
	$('.jsqrmm').blur(function(){
		isok_Tpaw = false;
		var val = $('.jsszmm').val();
		var val2 = $('.jsqrmm').val();
		val = $.trim(val);
		val2 = $.trim(val2);
		if(val2){
			if(val2 == val){
				isok_Tpaw = true;
				$('.jsqrmm').next().next().addClass('correct');
				$('.jsqrmm').next().text('');
				$('.jsqrmm').next().removeClass('ts-error');
				$('.jsqrmm').removeClass('bk-error');
			}else{
				$('.jsqrmm').next().next().removeClass('correct');
				$('.jsqrmm').addClass('bk-error');
				$('.jsqrmm').next().text('两次输入密码不一致,请再次输入');
				$('.jsqrmm').next().addClass('ts-error');
			}
		}else{
			$('.jsqrmm').next().next().removeClass('correct');
			$('.jsqrmm').addClass('bk-error');
			$('.jsqrmm').next().text('请再次输入密码');
			$('.jsqrmm').next().addClass('ts-error');
		}
	});
	//随机验证码
	function randomNumber(min, max) {
		return parseInt(Math.random() * (max - min + 1)) + min;
	}
	function randomColor(str) {
	//生成随机颜色
		if(str == 16) {
			//生成16进制的   '0123456789abcdef'  #666677
			var str = '0123456789abcdef';
			var color = '#';
			for(var i = 0; i < 6; i++) {
				color += str.charAt(parseInt(Math.random() * str.length));
		}

			return color;
	
		} else if(str == 'rgb') {
			//rgb(255,255,0) 生成3个随机数，每个随机数应该在  0-255
			var r = parseInt(Math.random() * 256);
			var g = parseInt(Math.random() * 256);
			var b = parseInt(Math.random() * 256);
	
			return 'rgb(' + r + ',' + g + ',' + b + ')';
	
		} else {
			alert('参数传错了');
		}
	}
	function randomNum(){
    	var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    	//2.生成随机思维数有字母的验证码
    	var num = str.charAt(parseInt(Math.random()*str.length));
    	return num;
	}
	function createPicCode(){
        for(i=0;i<4;i++){
            var html = randomNum();
            var color = randomColor(16);
            var foWeight = randomNumber(500,700);
            var foSize = randomNumber(20,30);
            $('#picCode span').eq(i).html(html).css({
                'color':color,'fontWeight':foWeight,'fontSize':foSize
            });
        }
    }
	createPicCode();
	$('#picCode').click(function(){
		createPicCode();
	});
	$('.code_val').blur(function(){
		var str = '';
		for(var i=0;i<4;i++){
			str+=$('#picCode span').eq(i).html();
		}
		var val = $('.code_val').val();
		val = $.trim(val);
		val = val.toLowerCase();
		str = str.toLowerCase(str);
		if(val){
			if(val == str){
				isok_auth = true;
				$('.code_val').next().next().next().addClass('correct');
				$('.code_val').next().next().text('');
				$('.code_val').next().next().removeClass('ts-error');
				$('.code_val').removeClass('bk-error');
			}else{
				$('.code_val').next().next().next().removeClass('correct');
				$('.code_val').addClass('bk-error');
				$('.code_val').next().next().text('验证码错误');
				$('.code_val').next().next().addClass('ts-error');
			}
		}else{
			$('.code_val').next().next().next().removeClass('correct');
			$('.code_val').addClass('bk-error');
			$('.code_val').next().next().text('不能为空');
			$('.code_val').next().next().addClass('ts-error');
		}
	});
	$('#readme').click(function(){
		isok_readme = !isok_readme;
		if(isok_readme){
			$('#readme').next().next().text('');
			$('#readme').next().next().removeClass('ts-error');
		}else{
			$('#readme').next().next().text('请勾选用户协议');
			$('#readme').next().next().addClass('ts-error');
		}
	});
	$('.btn-ljzc').click(function(){
		if(isok_usn && isok_paw && isok_Tpaw && isok_auth && isok_readme){
			var val = $('#mobile').val();
			var val2 = $('.jsszmm').val();
			val = $.trim(val);
			val2 = $.trim(val2);
			var url = '../api/registerTwo.php';
			var data = `name=${val}&pwd=${val2}&time=${new Date()}`;
			ajax('POST',url,data,function(str){
				console.log(str);
				if(str=='yes'){
					window.open('login.html');
//					location.href = 'login.html';
				}else{
					alert('注册失败,请重新注册');
				}
			});
		}
	});
	$('.btn-ksdl').click(function(){
//		location.href = 'login.html';
		window.open('login.html');
	});
	
});
