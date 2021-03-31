$(function(){
	var $ld5 = $(".pc-select-quyu");					  
	$ld5.ld({ajaxOptions : {"url" : "http://www.canyin1000.com/api.php?op=get_linkage&act=ajax_select&keyid=1"},defaultParentId : 0,style : {"width" : 100}})	 
	var ld5_api = $ld5.ld("api");
	ld5_api.selected();
	$ld5.bind("change",onchange);
	function onchange(e){
		var $target = $(e.target);
		var index = $ld5.index($target);
		var quyu = '';
		for(var i=0;i<=index;i++){
			quyu+=$ld5.eq(i).find("option:selected").text();
			if(i<index){
				quyu+='+';
			}
		}
		$("#quyu").val(quyu);
		index ++;
		$ld5.eq(index).show();
	}
	
	if($('select').hasClass('pc-select-quyu2')){
		var $ld6 = $(".pc-select-quyu2");					  
		$ld6.ld({ajaxOptions : {"url" : "http://www.canyin1000.com/api.php?op=get_linkage&act=ajax_select&keyid=1"},defaultParentId : 0,style : {"width" : 100}})	 
		var ld6_api = $ld6.ld("api");
		ld6_api.selected();
		$ld6.bind("change",onchange2);
		function onchange2(e){
			var $target = $(e.target);
			var index = $ld6.index($target);
			var quyu = '';
			for(var i=0;i<=index;i++){
				quyu+=$ld6.eq(i).find("option:selected").text();
				if(i<index){
					quyu+='+';
				}
			}
			$("#quyu2").val(quyu);
			index ++;
			$ld6.eq(index).show();
		}
	}
	if($('select').hasClass('pc-select-quyu3')){
		var $ld7 = $(".pc-select-quyu3");					  
		$ld7.ld({ajaxOptions : {"url" : "http://www.canyin1000.com/api.php?op=get_linkage&act=ajax_select&keyid=1"},defaultParentId : 0,style : {"width" : 100}})	 
		var ld7_api = $ld7.ld("api");
		ld7_api.selected();
		$ld7.bind("change",onchange3);
		function onchange3(e){
			var $target = $(e.target);
			var index = $ld7.index($target);
			var quyu = '';
			for(var i=0;i<=index;i++){
				quyu+=$ld7.eq(i).find("option:selected").text();
				if(i<index){
					quyu+='+';
				}
			}
			$("#quyu3").val(quyu);
			index ++;
			$ld7.eq(index).show();
		}
	}
	//表单验证
	var submiting = false;
	$("#myform").submit(function(){
		if(!submiting){
			submiting = true;
			var tg = true;
			$(this).find('input').not('#dosubmit').each(function(){
				if($(this).val() == '') {
					alert("请将表格填写完整！");
					$(this).focus();
					tg = false;
					submiting = false;
					return false;
				}else if($(this).attr('id') == 'mobile_ly' && !$(this).val().match(/^[1]\d{10}$/)) {
					alert("电话输入不正确");
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