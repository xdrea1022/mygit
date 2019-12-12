;(function(){
        "use strict";
        class Magnifier{
            constructor(){
                this.sBox = document.querySelector(".sBox");
                this.sSpan = document.querySelector(".sBox span");
                this.bBox = document.querySelector(".bBox");
                this.bImg = document.querySelector(".bBox img");
                
                this.init()
            }
            init(){
                var that = this;
                this.sBox.onmouseover = function(){
                    that.over()
                }
                this.sBox.onmousemove = function(eve){
                    var e = eve || window.event;
                    that.move(e)
                }
                this.sBox.onmouseout = function(){
                    that.out()
                }
            }
            over(){
                this.sSpan.style.display = "block";
                this.bBox.style.display = "block";
        //	根据右边图和框的比例,计算span的宽高
                this.sSpanW = (this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth);
                this.sSpanH = (this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight);
        //	设置span的宽高
                this.sSpan.style.width = this.sSpanW + "px";
                this.sSpan.style.height = this.sSpanH + "px";
                
        //	提前获取尺寸,方便将来使用
                this.sW = this.sBox.offsetWidth;
                this.sH = this.sBox.offsetHeight;
        
                this.bW = this.bBox.offsetWidth;
                this.bH = this.bBox.offsetHeight;
        
                this.bImgW = this.bImg.offsetWidth;
                this.bImgH = this.bImg.offsetHeight;
            }
            move(e){
        //	计算span要移动的left和top
                var l = e.clientX - this.sBox.offsetLeft - this.sSpan.offsetWidth/2;
                var t = e.clientY - this.sBox.offsetTop - this.sSpan.offsetHeight/2;
        //	span的边界限定
                if(l<0) l=0;
                if(t<0) t=0;
                if(l>this.sW - this.sSpanW){
                    l = this.sW - this.sSpanW;
                }
                if(t>this.sH - this.sSpanH){
                    t = this.sH - this.sSpanH;
                }
        //				设置span的位置
                this.sSpan.style.left = l + "px";
                this.sSpan.style.top = t + "px";
        //				根据span移动的位置,计算出比例,在根据比例,计算右边大图要移动的距离
                this.bImg.style.left = l / (this.sW - this.sSpanW) * (this.bW - this.bImgW) + "px";
                this.bImg.style.top = t / (this.sH - this.sSpanH) * (this.bH - this.bImgH) + "px";
            }
            out(){
        //				隐藏
                this.sSpan.style.display = "none";
                this.bBox.style.display = "none";
            }
        }
        
        new Magnifier();



	function Tab(){
		this.li = document.querySelectorAll("#box li");
		this.p = document.querySelectorAll(".text p");
		this.addEvent();
	}
	Tab.prototype.addEvent = function(){
		var that = this;
		for(var i=0;i<this.li.length;i++){
			this.li[i].index = i;
			this.li[i].onclick = function(){
//				3.开始计算索引
				that.changeIndex(this)
			}
		}
	}
	Tab.prototype.changeIndex = function(li){
//		计算索引的功能
		this.index = li.index;
//		4.根据索引显示当前
		this.setActive();
	}
	Tab.prototype.setActive = function(){
//	        根据索引显示当前的功能
		for(var i=0;i<this.li.length;i++){
			this.li[i].className = "";
			this.p[i].style.display = "none";
		}
		this.li[this.index].className = "active";
		this.p[this.index].style.display = "block";
	}
	
	new Tab();
	
})();
