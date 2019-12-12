;(function($){
    $(".banner").banner({
        items:$(".banner").find("img"),
        left:$(".banner").find("#left"),
        right:$(".banner").find("#right"),
        list:true,
        index:1,
		autoPlay:true,
        delayTime:2000,
        moveTime:1000
    });


    $(".__nav li").click(function(){
        //	1获取点击元素的索引
        var i = $(this).index();
        //	2根据索引找到指定结构,获取距离顶部的位置
        var t = $(".floor").eq(i).offset().top;
        //	$(document).scrollTop(t);
        //	3配合动画方法,设置滚动距离
        $("html").animate({
            scrollTop:t
        })
    })

    onscroll = ()=>{
        if($("html").scrollTop()<250){
            $(".__nav").fadeOut();
        }else{
            $(".__nav").fadeIn();
        }
    }
/* 二级导航 */
    $(function(){
        $(".list").children("li").hover(
            function(){
                $(this).children(".sub-item")
                .stop()
                .show(300)
            },function(){
                $(".sub-item").stop().hide(300)
            }
        )
    })
    /* $(".list").children("li").mouseover(function(){
        $(this)
        .children(".sub-item")
        .stop()
        .show(300)
        .parent()
        .siblings()
        .children(".sub-item")
        .stop()
        .hide(300);
    }) */
})(jQuery);