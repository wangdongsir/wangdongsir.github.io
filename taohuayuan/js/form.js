$(function(){
	//表单验证
	var submiting = false;
	$(".myform").submit(function(){
		if(!submiting){
			submiting = true;
			var tg = true;
			$(this).find('.yanzheng').each(function(){
				var bz = $(this).attr('data-bz');
				if($(this).val() == '') {
					alert(bz + "不能为空");
					$(this).focus();
					tg = false;
					submiting = false;
					return false;
				}else if(bz == "电话" && !$(this).val().match(/^[1]\d{10}$/)) {
					alert(bz + "输入不正确");
					$(this).focus();
					tg = false;
					submiting = false;
					return false;
				}
			});
			if(tg) {
				var name = $(this).find('input[name="info[name_ly]"]').val(),
					tel = $(this).find('input[name="info[mobile_ly]"]').val(),
					province = $(this).find("select[name='quyu-1']").find("option:selected").text(),
					city = $(this).find("select[name='quyu-2']").find("option:selected").text()!="市/区/县"?$(this).find("select[name='quyu-2']").find("option:selected").text():'',
			    	brand = $(this).find('input[name="info[laiyuan_ly]"]').val(),
			    	laiyuan = $(this).find('input[name="info[laiyuan_ly]"]').val(),
			    	$form = $(this),
			    	diqu = province + '+' + city;
			    $.ajax({
					  type: 'POST',
					  url: 'http://www.yuanjian-china.com/ECdata-liuyan.php',
					  cache:false,
					  data:{'name':name,'tel':tel,'city':diqu,'brand':brand,'laiyuan':laiyuan},
					  async:false,
					  success:function() {
					  	var ec = '<input type="hidden" name="info[ec]" value="1" />';
					  	$form.append(ec);
					  }
				  });
				alert("您的信息提交成功，我们的工作人员会尽快与您联系！");
				setTimeout(function(){
					window.location.reload();
				},500);
			};
			return tg;
		}else{
			return false;
		}
	});
});