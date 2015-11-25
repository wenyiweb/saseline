//var IMG_PATH = 'http://192.168.55.114/my/vaseline/';
var IMG_PATH = '';
var filelist = ['images/bg.jpg','images/star.png','images/sprite.png','images/light.png','images/brands.png','images/bigbg.jpg','images/tip.png','images/cloud.png','images/cup2.png','images/vaseline_1.png','imgages/vaseline_3.png','images/pb.jpg','images/vt.png','images/lk.png','images/k.png','images/kl.png','images/button.png','images/pst.png'];
function loadFn(files, process, complete){
	var loader = new PxLoader();
	for(var i=0;i<files.length;i++){
		loader.addImage(IMG_PATH+files[i]);
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
            	}else if(rY<-700){
            		rX = 900;
            		rY = -700;
            	}else{
            		rX = 900;
            	}
            }else if(rX<-300){
            	if(rY>1700){
            		rX = -300;
            		rY = 1700;
            	}else if(rY<-700){
            		rX = -300;
            		rY = -700;
            	}else{
            		rX = -300;
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
		//$('.search-page').show();
		fade('.cover','in');
		coverFn();
		var swiper = new Swiper('#swiper',{
			direction :"vertical",
			speed:250,
			initialSlide:0,
			slideActiveClass:'on',
			touchMoveStopPropagation:false,			
	        mousewheelControl: true,
	        keyboardControl: true,
	        onSlideChangeEnd : function(){
		    }
		});
		$('.wishbtn').on('click',function(){
			//$('#wish').addClass('animate');
			var btnh = $(window).height() - $('#wish .bs').offset().top - $('#wish .wishbtn').height();
			$('#wish .logo').css({
				'-webkit-transform':'translate3d(0,'+($(window).height() - $('#wish .logo').height())+'px,0)'
			});
			$('#wish .wishbtn').css({
				'-webkit-transform':'translate3d(0,-'+btnh+'px,0)'
			});
			$('#wish .logo').one('webkitTransitionEnd',function(){
				$('#wish .wishbtn').fadeOut('300',function(){
					$('#wish .bs').addClass('on')
				});
				
			});
			$('#wish .bs').one('webkitTransitionEnd',function(){
				$('#wish .bs').fadeOut('300');
				setTimeout(function(){
					$('#wish .lx3').addClass('on');
				},200);				
			});
			$('#wish .lx3').one('webkitTransitionEnd',function(){
				$('#wish .lx3').css('-webkit-transform','translate3d(-540px,600px,0)');
				$('#wish .lx3').one('webkitTransitionEnd',function(){
					$('#wish .share').fadeIn();
				})
			});
		})
	});
});
