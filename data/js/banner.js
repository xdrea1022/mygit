;(function($){
	"use strict";
	
	$.fn.banner = function(options){
//		功能...
//		1.默认参数的处理
//		console.log(this)
//		this.left = options.left;		×
		this._obj_ = {
			list:options.list===false ? false : true,
			index:options.index || 0,
			autoPlay:options.autoPlay===false ? false : true,
			delayTime:options.delayTime || 2000,
			moveTime:options.moveTime || 200,
//			假设上一张是最后一个索引
			iPrev:options.items.length-1
		};
		
		
		var that = this;
//		2.初始化布局
		this._obj_.init = function(){
//			给大框加溢出隐藏
			that.css({
				overflow:"hidden"
			});
			
//			每张图片的定位位置
			options.items.css({
				position:"absolute",
				left:options.items.eq(0).width(),
				top:0
			}).eq(this.index).css({
				left:0
			})
		}
		this._obj_.init();
		
//		3.判断是否传入左右按钮，有就做功能，没有就跳过
		if(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0 ){
//			3-1-1.绑定事件
			options.left.click(function(){
//				3-2-1.计算索引
				if(that._obj_.index == 0){
					that._obj_.index = options.items.length-1;
					that._obj_.iPrev = 0;
				}else{
					that._obj_.index--;
					that._obj_.iPrev = that._obj_.index+1;
				}
//				3-3-1.开始移动动画
				that._obj_.btnMove(1);
			})
//			3-1-2.绑定事件
			options.right.click(function(){
//				3-2-2.计算索引
				if(that._obj_.index == options.items.length-1){
					that._obj_.index = 0;
					that._obj_.iPrev = options.items.length-1
				}else{
					that._obj_.index++;
					that._obj_.iPrev = that._obj_.index-1;
				}
//				3-3-2.开始移动动画
				that._obj_.btnMove(-1);
			})
			
//			移动动画功能的定义
			this._obj_.btnMove = function(type){
				options.items.eq(that._obj_.iPrev).css({
					left:0
				}).stop().animate({
					left:options.items.eq(0).width() * type
				},that._obj_.moveTime).end().eq(that._obj_.index).css({
					left:-options.items.eq(0).width() * type
				}).stop().animate({
					left:0
				},that._obj_.moveTime);
				
				$(".blist").children().css({
					background:"rgba(200,200,200,0.6)"
				}).eq(that._obj_.index).css({
					background:"#008842"
				})
			}
		}
		
//		4.list为true，有小按钮功能
		if(this._obj_.list){
//			4-1.创建小按钮
			var str = "";
			for(var i=0;i<options.items.length;i++){
				str += `<li>${i+1}</li>`;
			}
//			4-2.创建小按钮的框,并设置框和小按钮的样式
			$("<ul class='blist'>").html(str).appendTo(this).css({
				width:"200px",
				height:30,
				display:"flex",
				position:"absolute",
				left:600,
				bottom:0,
				margin:0,
				padding:0,
				listStyle:"none"
			}).children().css({
				flex:1,
				// borderLeft:"solid 1px black",
				// borderRight:"solid 1px black",
				background:"rgba(200,200,200,0.6)",
				lineHeight:"30px",
				textAlign:"center",
				cursor:"pointer"
			}).eq(this._obj_.index).css({
				background:"#008842"
			});
//			4-3.给小按钮添加事件
			$(".blist").children("li").click(function(){
//				console.log(that._obj_.index,$(this).index());
//				4-4.判断点击的索引和当前索引的大小,决定移动的方向
				if($(this).index() > that._obj_.index){
//					console.log("左")
//					开始移动
					that._obj_.listMover($(this).index(),1);
				}
				
				if($(this).index() < that._obj_.index){
//					console.log("右")
//					开始移动
					that._obj_.listMover($(this).index(),-1);
				}
//				4-5.设置小按钮的当前项
				$(this).css({
					background:"#008842"
				}).siblings().css({
					background:"rgba(200,200,200,0.6)"
				})
//				4-6.点击功能完成之后,点击的索引要设置给当前索引
				that._obj_.index = $(this).index();
			})
			
//			移动的功能
			this._obj_.listMover = function(i,type){
				options.items.eq(that._obj_.index).css({
					left:0
				}).stop().animate({
					left:-options.items.eq(0).width() * type
				},that._obj_.moveTime).end().eq(i).css({
					left:options.items.eq(0).width() * type
				}).stop().animate({
					left:0
				},that._obj_.moveTime)
			}
		}
		
//		5.autoPlay为true，有自动轮播
		if(this._obj_.autoPlay){
			
			this._obj_.t = setInterval(()=>{
				options.right.trigger("click");
			},this._obj_.delayTime);
			
			
			this.hover(function(){
				clearInterval(that._obj_.t);
			},function(){
				that._obj_.t = setInterval(()=>{
					options.right.trigger("click");
				},that._obj_.delayTime)
			})
		}
		
//		封装思想
	}
})(jQuery);