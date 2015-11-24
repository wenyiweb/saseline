var filelist = ['images/bg.jpg','images/title.png','images/logo.png','images/sprite.png','images/light.png','images/brands.png'];
function loadFn(files, process, complete){
	var loader = new PxLoader();
	for(var i=0;i<files.length;i++){
		loader.addImage(files[i]);
	}
	if(process) process(0);
	loader.addProgressListener(function(e){
		var percent = Math.round( e.completedCount / e.totalCount * 100 );
		if(process) process(percent);
	});
	loader.addCompletionListener(function(e){
		if(complete) complete();
	});
	loader.start();
}
function fade(id,type,cb){
	var ele = document.querySelector(id);
	if(type == 'out'){
		ele.style.cssText += ';opacity:0;';
	}else if (type == 'in'){
		ele.style.cssText += ';opacity:0;';
		ele.style.display = 'block';
		setTimeout(function(){
			ele.style.cssText += ';opacity:1;';
		},10);
	}
	ele.addEventListener('webkitTransitionEnd',function(){
		if(type == 'out') {
			ele.style.display = 'none';
		}
		if(cb) cb();
		ele.removeEventListener('webkitTransitionEnd', arguments.callee);
	} ,false);
}
function coverFn(){
	//云层处理
}
function searchPageFn(){
	var stage = document.querySelector('.search-page');
	var bg = document.querySelector('.search-page .bg');
	var curX = 0,curY = 0,rX = 0,rY = 0;
	stage.addEventListener('touchstart', function(event){
		$('.tip').hide();
		var X = $(bg).offset().left,Y = $(bg).offset().top,
            startX = event.touches[0].clientX,startY = event.touches[0].clientY;
            console.log(X+"::"+Y);
        stage.addEventListener('touchmove',function(event){
        	var ev = event.touches[0];
            var curX = ev.clientX - startX;
            var curY = ev.clientY - startY;
            rX = X + curX + 960;
            rY = Y + curY + 1704;
            if(rX>900){
            	if(rY>1700){
            		rX = 900;
            		rY = 1700;
            		//$(bg).css({'left':900,'top':1700});
            	}else if(rY<-700){
            		rX = 900;
            		rY = -700;
            		//$(bg).css({'left':900,'top':-700});
            	}else{
            		rX = 900;
            		//$(bg).css({'left':900,'top':rY});
            	}
            }else if(rX<-300){
            	if(rY>1700){
            		rX = -300;
            		rY = 1700;
            		//$(bg).css({'left':-300,'top':1700});
            	}else if(rY<-700){
            		rX = -300;
            		rY = -700;
            		//$(bg).css({'left':-300,'top':-700});
            	}else{
            		rX = -300;
            		//$(bg).css({'left':-300,'top':rY});
            	}
            }else{
            	if(rY>1700){
            		rY = 1700;
            	}else if(rY<-700){
            		rY = -700;
            	}
            }

            setTimeout(function(){
            	$(bg).css({'left':rX,'top':rY});
            },20);       
        },false)
	},false);

	$('.vaseline').on('touchstart',function(){
		$(this).fadeOut();
		$('.vaseline_logo').hide().css('opacity',1).fadeIn();
	});
	$('.vaseline_logo').on('touchstart',function(){
		$('.search-page').fadeOut();
		$('.scan').fadeIn();
	})
}


		
function fontSize()
{
    var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;

    var _html = document.getElementsByTagName('html')[0];

    if (view_width > 640)
    {
        _html.style.fontSize = 640 / 16 + 'px';
    }
    else
    {
        _html.style.fontSize = view_width / 16 + 'px';
    }
}//http://wximg.qq.com/wxp/moment/VJ7cVAsbe/html/index.html
$(function(){
	//fontSize();
	/* window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        setTimeout(function () {
            fontSize();
        }, 100);
    }, false);*/
	var wh =  $(window).height();
	if(wh<=960){	
		//$('.ma').addClass('masca');
	}
	
	
	$('.loading').height(wh).css({'overflow':'hidden'});
	$('body').show();
	loadFn(filelist, function(n) {
		$('.loadingpercent').html(n+"%");
	}, function() {
		fade('.loading','out');
		$('.search-page').show();
		searchPageFn();
		//fade('.cover','in');
		//$('.loading').fadeOut();
		//$('.cover').fadeIn();
	});
});
