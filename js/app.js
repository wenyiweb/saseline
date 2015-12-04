//var IMG_PATH = 'http://192.168.55.114/my/vaseline/';
var IMG_PATH = '';//资源文件地址
var filelist = ['images/bg.jpg','images/star.png','images/award.png','images/y1.png','images/y2.png','images/y3.png','images/y4.png','images/y5.png','images/y6.png','images/y7.png','images/light.png','images/brands.png','images/bigbg.jpg','images/tip.png','images/cloud.png','images/cup2.png','images/vaseline_3.png','images/pb.jpg','images/vt.png','images/lk.png','images/k.png','images/kl.png','images/button.png','images/pst.png','images/share.png'];
var audio;
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
/**
 * 云层处理
 * @return {[type]} [description]
 */
function coverFn(){
	
	var count = 0;
	$('.yun-content').on('touchmove',function(e){
		e.preventDefault();
		blingFn.init();
		$('.yun-content .yun').addClass('on');
		$('.yun-content .yun5').one('webkitTransitionEnd',function(){
			$('.yun-content').hide();
			brandsFn();
		})
		/*if(count == 0){
			$('.yun-content .yun3').addClass('on');
			$('.yun-content .yun3').one('webkitTransitionEnd',function(){
				count = 1;
			})
		}
		if(count == 1){
			$('.yun-content .yun4').addClass('on');
			$('.yun-content .yun4').one('webkitTransitionEnd',function(){
				count = 2;
			})
		}
		if(count == 2){
			$('.yun-content .yun2,.yun-content .yun6').addClass('on');
			$('.yun-content .yun2').one('webkitTransitionEnd',function(){
				count = 3;
			})
		}
		if(count == 3){
			$('.yun-content .yun7').addClass('on');
			$('.yun-content .yun7').one('webkitTransitionEnd',function(){
				count = 4;
			})
		}
		if(count == 4){
			$('.yun-content .yun5,.yun-content .yun1').addClass('on');
			$('.yun-content .yun5').one('webkitTransitionEnd',function(){
				count =5;
				$('.yun-content').hide();
				brandsFn();
			})
		}*/
	})
}
/**
 * 品牌处理
 * @return {[type]} [description]
 */
function brandsFn(){
	$('.brands,.cover .logo').addClass('on');
	$('.cover .logo').one('webkitTransitionEnd',function(){
		setTimeout(function(){

			$('.cover,.or').addClass('out');
			$('.search-page').show();
			loaded();
			setTimeout(function(){
				$('.or').hide();
				$('.search-page .cloud,.search-page .cup,.search-page .tip,.us').addClass('on');
				
			},3000);
			
		},1000);
	});
}
/**
 * 寻找最亮的星
 * @return {[type]} [description]
 */

var myScroll;

function loaded () {
	myScroll = new IScroll('#wrapper', {
		mouseWheel: true,scrollX: true, freeScroll: true ,bounce:false,
		indicators: [{
			el: document.getElementById('starfield1'),
			resize: false,
			ignoreBoundaries: true,
			speedRatioY: 0.4,
			speedRatioX: 0.4
		}/*, {
			el: document.getElementById('starfield2'),
			resize: false,
			ignoreBoundaries: true,
			speedRatioY: 0.2,
			speedRatioX: 0.2
		}*/]
	});
	$('.vaseline').on('tap',function(e){
		e.preventDefault();
		blingFn.init();
		$(this).fadeOut();
		$('.vaseline_tip').fadeOut();
		$('.vaseline_logo').hide().css('opacity',1).fadeIn(function(){
			myScroll.destroy();
			//clearInterval(interval);
			setTimeout(function(){
				fade('.search-page','out');
				fade('#swiper','in',scanFn)
				/*$('.search-page').fadeOut('800');
				$('#swiper').fadeIn('800',function(){
					scanFn();
				});*/
			},2000);
		});
	});
	$('#wrapper').on('touchstart',function(){
		$('.search-page .tip').hide();	
	})
}
/**
 * 扫描
 * @return {[type]} [description]
 */
function scanFn(){
	productFn();
}
function productFn(){
	//$('#swiper').fadeIn();
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
	$('.view').on('tap',function(){
		$('.arrow').fadeIn();			
		$('.reason').addClass('on');
	});
	$('.reason .close').on('tap',function(){
		$('#scan-product').removeClass('swiper-no-swiping');
		$('.reason').removeClass('on');
	})
	$('.wishbtn').on('click',function(){
		//$('#wish').addClass('animate');
		wishFn();
	})
}
//报名
function addUser(){
	var url = "http://www.cosmopolitan.com.cn/files/eventapi.php?c=EventApiNew&a=AddEvent&indexsId=617";  

	var data = { 
		"data[2473]": "13031652389",//手机 
		"data[2474]": "kevin",//真实姓名 
		"data[2475]": "test wish",//願望
	};
	$.ajax({
		url:url,
		data:data,
		type:"GET",
		success:function(reqData){
			console.log(reqData)
		}
	});
}
function wishFn(){
	$('#wish').addClass('animate');
	$('.wishtitle,.form').hide();
	var btnh = $(window).height() - $('#wish .bs').offset().top - $('#wish .wishbtn').height();
	$('#wish .logo').css({
		'-webkit-transform':'translate3d(0,'+($(window).height() - $('#wish .logo').height())+'px,0)'
	});
	$('#wish .wishbtn').css({
		'-webkit-transform':'translate3d(0,-'+btnh+'px,0) scale(0.5)',
		'opacity':0
	});
	$('#wish .logo').one('webkitTransitionEnd',function(){
		fade('#wish .wishbtn','out',function(){
			$('#wish .bs').addClass('on')
		})
		/*$('#wish .wishbtn').fadeOut('300',function(){
			$('#wish .bs').addClass('on')
		});*/
	});
	$('#wish .bs').one('webkitTransitionEnd',function(){
		//$('#wish .bs').fadeOut('300');
		$('#wish .bs').removeClass('on');
		setTimeout(function(){
			$('#wish .lx3').addClass('on');
		},200);				
	});
	$('#wish .lx3').one('webkitTransitionEnd',function(){
		$('#wish .lx3').css('-webkit-transform','translate3d(-540px,600px,0)');
		$('#wish .lx3').one('webkitTransitionEnd',function(){
			$('#wish .share').fadeIn(function(){
				$('.wishsucc').addClass('on');
			});
		})
	});
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
}

/*$(function(){
	var wh =  $(window).height();
	$('body').css('height',wh);
	
	$('.loading').height(wh).css({'overflow':'hidden'});
	loadFn(filelist, function(n) {
		$('.loadingpercent').html(n+"%");
	}, function() {
		fade('.loading','out');
		//$('.search-page').show();
		fade('.cover','in');
		coverFn();
		blingFn.testplay();
		audio = new Audio();
		audio.init();
	});
	$('.explore').on('click',function(){
		blingFn.init();
		$(this).fadeOut();
		$('.scan-box,#product,.main').addClass('on');
		$('.kl').one('webkitAnimationEnd',function(){
			$('.scan').fadeOut();
			$('#product .title').addClass('on');
			$('.view').fadeIn();			
		});
		
	})
});*/
function Audio(){
	this.aud = document.querySelector('.audio');
	this.audio = document.querySelector('.audio audio');
}
Audio.prototype = {
	init:function(){
		this.aud.style.display = 'block';
		this.eventFn();
		this.autoplay();
	},
	autoplay:function(){
		var _this = this;
		_this.audio.play();
		_this.aud.classList.add('on');
	},
	play:function(){
		var _this = this;
		if(_this.audio.pause) {
			_this.audio.play();
			this.aud.classList.add('on');
		}
	},
	pause:function(){
		var _this = this;
		if(_this.audio.play){
			 _this.audio.pause();
			 this.aud.classList.remove('on');
		}
	},
	eventFn:function(){
		var _this = this;
		_this.aud.addEventListener('touchstart', function(){
			if(this.classList.contains('on')){
				_this.pause();
			}else{
				_this.play();
			}
		}, false);
	}
}
/**
 * 定制音乐
 * @return {[type]} [description]
 */
var blingFn = {
	ad: document.querySelector('.bling audio'),
	init: function(){
		//audio.pause();
		this.ad.play();
		//blingFn.eventInit();
	},
	testplay:function(){
		this.ad.play();
		this.ad.pause();
	},
	eventInit: function(){
		this.ad.addEventListener('ended', blingFn.endContr, false);
	},
	endContr: function(){
		//audio.play();
		this.ad.pause();
	}
}

function  load(cb){
  var _load = document.querySelector('.loading'),
	per = _load.querySelector('.loadingpercent'),
	logo = document.querySelector('.loading .logo'),
	timer,
	src = ['images/bg.jpg',],
	img = new Image();
	logo.addEventListener('webkitTransitionEnd',function(){
		if(timer) return;
		timer = setTimeout(function(){
		  num();
		  timer = null;
		},300)
	  },false)
  var n = 5,t;
  function num(){
	n++;
	if(document.readyState == 'complete'){
	  clearTimeout(t);
	  t= null;
	  per.innerHTML = 100 + '%';
	  // start
	  setTimeout(function(){
		hide()
	  },1000)
	  return;
	}
	per.innerHTML = n + '%';
	if(n==90){
	  n--;
	}
	t = setTimeout(num,100)
  }

  function hide(){
  	fade('.loading','out');
  	fade('.cover','in',function(){
  		cb&&cb();
  	});
  }
  img.onload = function(){
	_load.classList.add('on');
  }
  img.src = src;
}
var wh =  $(window).height();
$('body').css('height',wh);

$('.loading').height(wh).css({'overflow':'hidden'});
load(function(){
	//fade('.loading','out');
	//fade('.cover','in');
	coverFn();
	blingFn.testplay();
	audio = new Audio();
	audio.init();
	$('.explore').on('click',function(){
		blingFn.init();
		$(this).fadeOut();
		$('.scan-box,#product,.main').addClass('on');
		$('.kl').one('webkitAnimationEnd',function(){
			$('.scan').fadeOut();
			$('#product .title').addClass('on');
			$('.view').fadeIn();			
		});
		
	})
});