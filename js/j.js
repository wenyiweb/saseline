//var IMG_PATH = 'http://192.168.55.114/my/vaseline/';
var IMG_PATH = '';//资源文件地址
var filelist = ['images/bg.jpg','images/star.png','images/sprite.png','images/light.png','images/brands.png','images/bigbg.jpg','images/tip.png','images/cloud.png','images/cup2.png','images/vaseline_3.png','images/pb.jpg','images/vt.png','images/lk.png','images/k.png','images/kl.png','images/button.png','images/pst.png','images/share.png'];
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
            setTimeout(function(){
                $('.or').hide();
                $('.search-page .cloud,.search-page .cup,.search-page .tip,.us').addClass('on');
            },3000);
            
        },1000);
    })
    searchPageFn();
    //searchPageFn.init();
}
/**
 * 寻找最亮的星
 * @return {[type]} [description]
 */
/* start: function(e) {
    var touch = e.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    time = +new Date().getTime();

    wrap[0].addEventListener('touchmove', pageAPI.move, false);
},
move: function(e) {
    var touch = e.touches[0];
    endX = touch.pageX - startX;
    endY = touch.pageY - startY;

    wrap[0].addEventListener('touchend', pageAPI.end, false);
},
end: function(e) {
    time = +new Date().getTime() - time;
    if ((time > 100) && Math.abs(endY) > Math.abs(endX)) {
        if (endY < 0) {
            wrap.animate({
                '-webkit-transform': 'translate3d(0px, -100%, 0px)',
                '-webkit-transition': '-webkit-transform 0.4s ease-in-out 0s;',
                'transition': '-webkit-transform 0.4s ease-in-out 0s'
            }, 0.4, 'ease-in-out');
            setTimeout(function() {
                setThemeText();
            }, 500);
        }
    }
    wrap[0].removeEventListener('touchmove', pageAPI.move, false);
    wrap[0].removeEventListener('touchend', pageAPI.end, false);
},*/
/*var startX = 0,
    startY = 0,
    endX = 0,
    endY = 0,
    time = 0,
    index = 0,
    rX = 0,
    rY = 0;
    stage = document.querySelector('.search-page'),
    bg = document.querySelector('.search-page .bg');
var searchPageFn = {
     X:0,
     Y:0,
     start: function(e) {
        var touch = e.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        searchPageFn.X = $(bg).offset().left;
        searchPageFn.Y = $(bg).offset().top
        time = +new Date().getTime();

       stage.addEventListener('touchmove', searchPageFn.move, false);
    },
    move: function(e) {
        var touch = e.touches[0];
        endX = touch.pageX - startX;
        endY = touch.pageY - startY;
        rX = searchPageFn.X + endX + 960;
        rY = searchPageFn.Y + endY + 1704;
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
        stage.addEventListener('touchend', searchPageFn.end, false);
    },
    end: function(e) {
        time = +new Date().getTime() - time;
        if ((time > 100) /*&& Math.abs(endY) > Math.abs(endX)*/) {
            //if (endY < 0) {
                $(bg).css({
                    '-webkit-transform': 'translate3d('+rX+'px, '+rY+'px, 0px)',
                    '-webkit-transition': '-webkit-transform 0.4s ease-in-out 0s;',
                    'transition': '-webkit-transform 0.4s ease-in-out 0s'
                });
           // }
        }
        stage.removeEventListener('touchmove', searchPageFn.move, false);
        stage.removeEventListener('touchend', searchPageFn.end, false);
    },
    init:function(){
        stage.addEventListener('touchstart',searchPageFn.start,false);
        $('.vaseline').on('tap',function(e){
            e.preventDefault();
            $(this).fadeOut();
            $('.vaseline_tip').fadeOut();
            $('.vaseline_logo').hide().css('opacity',1).fadeIn(function(){
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
    }

}*/
function searchPageFn(){
    var stage = document.querySelector('.search-page');
    var bg = document.querySelector('.search-page .bg');
    //var us = document.querySelector('.search-page .us');
    var curX = 0,curY = 0,rX = 0,rY = 0,uX = 0,uY = 0;
    stage.addEventListener('touchstart', function(event){
        event.preventDefault();
        $('.tip').hide();
        var X = $(bg).offset().left,Y = $(bg).offset().top,
    //  X2 = $(us).offset().left,Y2 = $(us).offset().top,
            startX = event.touches[0].clientX,startY = event.touches[0].clientY;
        stage.addEventListener('touchmove',function(event){
            event.preventDefault();
            var ev = event.touches[0];
            var curX = ev.clientX - startX;
            var curY = ev.clientY - startY;
            rX = X + curX + 960;
            rY = Y + curY + 1704;
           /* uX = X2 + curX + 960*2;
            uY = Y2 + curY + 1704*2;*/
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
           /* console.log('1.===='+rX+"::"+uX)
            if(uX < 0){
                uX=0;
            }
            if(uY < 0){
                uY = 0;
            }
            console.log('2.===='+rX+"::"+uX)*/
            setTimeout(function(){
                $(bg).stop().animate({'left':rX,'top':rY},300);
                //$(bg).css({'left':rX,'top':rY});
                //$(us).css({'left':uX,'top':uY});
            },10);
        },false)
    },false);

    $('.vaseline').on('tap',function(e){
        e.preventDefault();
        $(this).fadeOut();
        $('.vaseline_tip').fadeOut();
        $('.vaseline_logo').hide().css('opacity',1).fadeIn(function(){
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
    /*$('.vaseline_logo').on('tap',function(e){
        e.preventDefault();
        $('.search-page').fadeOut();
        $('.scan').fadeIn(function(){
            scanFn();
        });
    })*/
}
/**
 * 扫描
 * @return {[type]} [description]
 */
function scanFn(){
//  slightMovement.initSlightMovement();
    productFn();
    var count = 0,blur = 28;
    /*$('.explore').on('click',function(){
        $(this).fadeOut();
        $('.scan-box,#product,.main').addClass('on');
        $('.kl').one('webkitAnimationEnd',function(){
            $('.scan').fadeOut();
            $('#product .title').addClass('on');
            $('.view').fadeIn();
            $('.arrow').fadeIn();
            $('#scan-product').removeClass('swiper-no-swiping');
        });
        
    })*/
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
        $('#product').addClass('swiper-no-swiping');
        $('.reason').addClass('on');
    });
    $('.reason .close').on('tap',function(){
        $('#product').removeClass('swiper-no-swiping');
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
            $('#wish .share').fadeIn();
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
//左右移动slightMovement.ismove
    var slightMovement = {
        ismove:true,
        x:0,
        y:0,
        lastX:0,
        lastY:0,
        initSlightMovement:function(){
            var h = window.screen.width > window.screen.height ? window.screen.width : window.screen.height;
            if (window.DeviceMotionEvent /**&& ! navigator.userAgent.match(/Android/i) && h >= 568**/) { 
                slightMovement.addEvent(window,"devicemotion",slightMovement.deviceMotionHandler);
            }
        },
        addEvent:function(obj,type,fn){
            if(obj.attachEvent){
                obj['e' + type +fn] = fn;
                obj[type+fn] = function(){
                    obj['e' + type + fn](window.event);
                }
                obj.attachEvent("on" + type,obj[type+fn]);
            }else{
                obj.addEventListener(type,fn,false);
            }
        },
        removeEvent:function(obj,type,fn){
            if ( obj.detachEvent ) { 
                obj.detachEvent( 'on'+type, obj[type+fn] ); 
                obj[type+fn] = null; 
              } else {
                obj.removeEventListener( type, fn, false ); 
              }
                
        },
        deviceMotionHandler:function(eventData){
            if (slightMovement.ismove) {
            var acceleration = eventData.accelerationIncludingGravity;
            var facingUp = -1;
            if (acceleration.z > 0) {
                facingUp = +1;
            }
            var LR = Math.round(((acceleration.x) / 9.81) * -180);
            $('#rr').html(((acceleration.x) / 9.82) * -180)
            if(navigator.userAgent.match(/Android/i)){
                     if(LR < -20 ){
                         LR = LR < -40 ? -40 : LR;
                        $("#ps").stop().animate({"left":-40},600);
                     }else if(LR > 20 ){
                          LR = LR > 40 ? 40 : LR;
                        $("#ps").stop().animate({"left":40},600);
                     }else{
                        $("#ps").stop().animate({"left":0},600);
                     }
                }else{
                     if(LR < -10 ){
                         LR = LR < -40 ? -40 : LR;
                        $("#ps").stop().animate({"left":-LR},300);
                     }else if(LR > 15 ){
                          LR = LR > 40 ? 40 : LR;
                        $("#ps").stop().animate({"left":-LR},300);
                     }else{
                        $("#ps").stop().animate({"left":-LR},300);
                     }
                }

        } else {
            $("#ps").stop();
        }
            /*if(slightMovement.ismove){
                 var acceleration = eventData.accelerationIncludingGravity; 
                    this.x = acceleration.x;
                    this.y = acceleration.y;
                   // this.z = acceleration.z;

           //     if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed || Math.abs(z-lastZ) > speed) {
                    //简单的摇一摇触发代码
                  //  alert(acceleration.z);
            //    }
                this.lastX = x;
                this.lastY = y;
                //this.lastZ = z;
                 if (acceleration.z > 0) { 
                    facingUp = +1; 
                 }      
                 var LR = Math.round(((acceleration.x) / 9.82) * -180); 
                $('#rr').html(((acceleration.x) / 9.82) * -180)
                if(LR < -50 ){
                    LR = LR < -50 ? -50 : LR;
                    $("#ps").stop().animate({"left":-LR*2},300);
                }else if(LR > 50 ){
                    LR = LR > 50 ? 50 : LR;
                    $("#ps").stop().animate({"left":-LR*2},300);
                }else{
                    $("#ps").stop().animate({"left":-LR*2},300);
                }
                
            }else{
                //$(".ps").stop();
            }*/
        }
    };
//slightMovement.initSlightMovement();
$(function(){
    //fontSize();
    /* window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        setTimeout(function () {
            fontSize();
        }, 100);
    }, false);*/
    var wh =  $(window).height();
    $('body').css('height',wh);
    if(wh<=960){    
        //$('.ma').addClass('masca');
    }
    
    
    $('.loading').height(wh).css({'overflow':'hidden'});
    //$('body').show();
    loadFn(filelist, function(n) {
        $('.loadingpercent').html(n+"%");
    }, function() {
        fade('.loading','out');
        //$('.search-page').show();
        fade('.cover','in');
        coverFn();
    });
    $('.explore').on('click',function(){
        $(this).fadeOut();
        $('.scan-box,#product,.main').addClass('on');
        $('.kl').one('webkitAnimationEnd',function(){
            $('.scan').fadeOut();
            $('#product .title').addClass('on');
            $('.view').fadeIn();
            $('.arrow').fadeIn();
            $('#scan-product').removeClass('swiper-no-swiping');
        });
        
    })
});
