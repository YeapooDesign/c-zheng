var cWidth = $(window).width(),
		itemWidth = cWidth/3,
		$slider = $('#schedule-header').find('ul'),
		children = $slider.find('li');

function fixEvent(e){
	var evt;
	if(e.changedTouches){
		evt = e.changedTouches[e.changedTouches.length - 1];
	}
	return evt;
}

function go(direction,activeIndex){
	var _lf = parseFloat($slider.css('left'));
	$slider.animate({'left':_lf + itemWidth*direction},400,'easeOut');
	children.eq(activeIndex).addClass('active').siblings().removeClass('active');
	if(activeIndex=== children.length - 1){
		$('#next').hide();
		$('#previous').show();
	}else if(activeIndex === 0){
		$('#previous').hide();
		$('#next').show();
	}else{
		$('#next,#previous').show();
	}


}

children.each(function(i){
	var $that = $(this);
	var index = i;
	$that.css({width:itemWidth}).on('touchend',function(){
		var activeIndex = children.index($slider.find('.active'));
		if(activeIndex === index){
			return;
		}else if(activeIndex < index){
			go(-1,activeIndex+1);
		}else{
			go(1,activeIndex-1);
		}
	});
});//end each

$('#next').on('touchend',function(e){
	var currentIndex = children.index($slider.find('.active'));
	if(currentIndex < children.length-1){
		go(-1,currentIndex+1);
	}
});

$('#previous').on('touchend',function(e){
	var currentIndex = children.index($slider.find('.active'));
	if(currentIndex >= 1){
		go(1,currentIndex-1);
	}
});