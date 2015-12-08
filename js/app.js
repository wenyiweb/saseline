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
		blingFn.m1play();
		$('.yun-content .yun').addClass('on');
		$('.yun-content .yun5').one('webkitTransitionEnd',function(){
			$('.yun-content').hide();
			brandsFn();
		})
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
		}, {
			el: document.getElementById('starfield2'),
			resize: false,
			ignoreBoundaries: true,
			speedRatioY: 1,
			speedRatioX: 1
		}]
	});
	$('.vaseline').on('tap',function(e){
		e.preventDefault();
		blingFn.m2play();
		$(this).fadeOut();
		$('.vaseline_tip').fadeOut();
		$('.vaseline_logo').hide().css('opacity',1).fadeIn(function(){
			myScroll.destroy();
			setTimeout(function(){
				fade('.search-page','out');
				fade('#swiper','in',scanFn)
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
        	if(swiper.activeIndex == swiper.slides.length-1){
        		$('.audio').hide();
        	}
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
		blingFn.m4play();
		addUser();
		//$('#wish').addClass('animate');
		//wishFn();
	})
}
//报名
function addUser(){
		var url = "http://www.cosmopolitan.com.cn/files/eventapi.php?c=EventApiNew&a=AddEvent&indexsId=617&callbackfun=addUserCallback";  
		var name = $('#form_name').val();
		var phone = $('#form_tel').val();
		var wish = $('#form_wish').val();
		var phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$/;
		if(name==''||name=='姓名'){
			alert('万一中奖了，怎么称呼您？');
			$('#form_name').focus();
			return false;
		}
		if(phone==''){
			alert('万一中奖了，没电话怎么联系您啊');
			$('#form_tel').focus();
			return;
		}else if(!phone.match(phoneReg)){
			alert('请输入正确的手机号码');
			$('#form_tel').focus();
			return false;
		}
		if(wish==''){
			alert('不输入愿望吗？');
			$('#form_wish').focus();
			return false;
		}
		var data = { 
			"data[2473]": phone,//手机 
			"data[2474]": name,//真实姓名 
			"data[2475]": wish,//願望
		};
		$.ajax({
			url:url,
			data:data,
			type:"GET",
			dataType:'jsonp',
		});
	}
	function addUserCallback(res){
		if(res.status == 1){
			wishFn();
		}else{
			alert(res.info);
		}
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
			$('.wishsucc').addClass('on');
			fade('#wish .share','in');
			/*setTimeout(function(){
				$('#wish .share').fadeIn();
			},800)*/
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
	m1play:function(){
		document.querySelector('.bling #m1').play();
	},
	m2play:function(){
		document.querySelector('.bling #m2').play();
	},
	m3play:function(){
		document.querySelector('.bling #m3').play();
	},
	m4play:function(){
		document.querySelector('.bling #m4').play();
	},
	testplay:function(){
		var _this = this;
		for(var i=0;i<_this.ad.length;i++){
			_this.ad[i].play();
			_this.ad[i].pause();
		}
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
  	$('.search-page').hide();
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
	
	coverFn();
	blingFn.testplay();
	audio = new Audio();
	audio.init();
	$('.explore').on('click',function(){
		blingFn.m3play();
		$(this).fadeOut();
		$('.scan-box,#product,.main').addClass('on');
		$('.kl').one('webkitAnimationEnd',function(){
			$('.scan').fadeOut();
			$('#product .title').addClass('on');
			$('.view').fadeIn();			
		});
		
	})
});
//share
$(function(){
	$.getJSON('http://m.cosmopolitan.com.cn/files/eventapi.php?c=Cosmom_Jssdk&type=json&url='+String(window.location.href),function(data){
		wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'previewImage'
          ]
      });
	});
});
	
wx.ready(function () {
	wx.error(function(res){
	    //console,log(res);
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

	});

	wx.checkJsApi({
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	        // 以键值对的形式返回，可用的api值true，不可用为false
	        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
	    }
	});

	wx.onMenuShareAppMessage(shareData);
	wx.onMenuShareTimeline(shareData);
	wx.onMenuShareQQ(shareData);
	wx.onMenuShareWeibo(shareData);
});