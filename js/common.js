$(function(){
	//首页图片滚动
	if($('#banner').length){
		var slide = new TouchSlider({
            id:'banner',
            begin:0,
            auto:false,
            speed:300,
            timeout:3000
        });
        var slideFlag = $('#round').find('li');
        var slide = new TouchSlider({id:'banner',before:function(index){
                slideFlag.removeClass('active');
                slideFlag.eq(index).addClass('active');
        }});
        $('#previous').on('click',function(){
        	slide.prev();
        })
        $('#next').on('click',function(){
        	slide.next();
        })
    }
    if($('#Exchange').length){
        var min = 1000; //生成的最小的数字，比如200
        var max = 9999; //生成的最大的数字，比如500
        var ctl_id = "Exchange";
        function Refresh() {
            document.getElementById(ctl_id).innerHTML = parseInt(Math.random() * (max - min + 1) + min);
        }
        var clear_num = setInterval(Refresh,10);
        function clear_n(){
            clearInterval(clear_num);
            $('#Exchange').html('1093');
        }
        setTimeout(clear_n,2000);
    }
    //菜单显示
    $('#nav ul >li').on('click',function(){
        if($(this).hasClass('active')){
            $('#nav ul>li').removeClass('active');
            $('#nav_bg').hide();
        }else{
            $('#nav_bg').show();
            $('#nav ul>li').removeClass('active');
            $(this).addClass('active');
        }
    })
    $('#nav_bg').on('click',function(){
        $('#nav ul>li').removeClass('active');
    });

    //车辆震动报警
    $('#warning').on('click',function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    })
    //报警等级选择
    $('#collbox li').on('click',function(){
        $('#collbox li').removeClass('active');
        $(this).addClass('active');
    })//报警等级选择
    $('#collbox2 li').on('click',function(){
        $('#collbox2 li').removeClass('active');
        $(this).addClass('active');
    })
    //已注册弹出框
     $('#J_join_btn').on('click',function(){
        $('#J_join_cons').show();
        $(this).addClass('disabled').html("已经注册");
    })
       $('#J_join_btnoff').on('click',function(){
        $('#J_join_cons').hide();
    })
})