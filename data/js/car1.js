;(function(){
    class Car{
        constructor(){
            this.url="http://localhost/yiguo/data/goods.json";
            this.tbody=document.querySelector("tbody");
            this.all=document.querySelector("thead .all");
            this.load();
            this.addEvent();
            this.change();
            this.allbox();
            this.span=document.querySelector(".price span");
        }
        // 全选时，勾选其他复选框，取消全选其他复选框也取消全选，同时改变结算的价格
        allbox(){
            var that=this;
            this.all.onclick=function(){
                var num=0;
                for(var i=0;i<that.acbox.length;i++){
                    if(this.checked){
                        that.acbox[i].checked=true;
                        num+=+that.prices[i].innerHTML;
                    }else{
                        that.acbox[i].checked=false;
                    }
                }
                that.span.innerHTML=num;
            }
        }
        // 改变数量时，改变cookies中num的数量，同时改变总价
        change(){
            var num=0;
            this.tbody.addEventListener("input",(eve)=>{
                var e=eve||window.event;
                var target=e.target||e.srcElement;
                if(target.className=="change"){
                     for(var i=0;i<this.acbox.length;i++){
                         if(this.goods[i].id==target.parentNode.parentNode.getAttribute("index")){
                            console.log(target) 
                            this.goods[i].num=parseInt(target.value);
                            //  console.log(i)
                            target.parentNode.nextElementSibling.innerHTML=target.value*target.parentNode.previousElementSibling.innerHTML;
                            }
                    }
                    this.setCookie();
                    this.pay();
                }
            })
        }
        // 开启ajax获取数据
        load(){
            var that = this;
            ajaxGet(this.url,(res)=>{
                that.res=JSON.parse(res);
                that.getCookie(that.res);
            })
        }
        // 获取缓存
        getCookie(res){
            // console.log(res)
           this.goods= getCookie("goods")?JSON.parse(getCookie("goods")):[];
           console.log(res)
            let res1 = res;
           this.display(res1);
        }
        // 把获取到的缓存和获取到的数据进行对比之后填充页面
        display(res){
            var str="";
            // console.log(this.goods);
            for(var i=0;i<res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[i].goodsId==this.goods[j].id){
                        str+=`<tr index="${this.goods[j].id}">
                        <td class="car-check">
                            <input type="checkbox" class="cbox">
                        </td>
                        <td class="car-info">
                            <a href="#">
                                <img src="${res[i].url}" alt="">
                                <span>${res[i].name}</span>
                            </a>
                        </td>
                        <td class="car-price">￥${res[i].price}</td>
                        <td class="car-num">
                            <div class="quantity-form">
                                <input type="button" value="-" class="subtract btn">
                                <input type="number"  class="txt change" min=1 value=${this.goods[j].num}>
                                <input type="button" value="+" class="add btn">
                            </div>
                        </td>
                        <td class="car-total prices">
                            <span>￥${this.goods[j].num*res[i].price}</span>
                        </td>
                        <td class="car-opera delete">删除</td>
                    </tr>`
                    }
                }
            }
            this.tbody.innerHTML=str;
            // 填充页面之后再获取复选框和number元素
            this.acbox=document.querySelectorAll(".cbox");
            this.prices=document.querySelectorAll(".prices");
        }
        // 删除和复选框的操作
        addEvent(){
            var that = this;
			this.tbody.addEventListener("click",function(eve){
				var e = eve || window.event;
				var target = e.target || e.srcElement;
				if(target.className == "delete"){
					that.id = target.parentNode.getAttribute("index");
					target.parentNode.remove();
					that.changeCookie(function(i){
						that.goods.splice(i,1);
					});
				}
			})
			this.tbody.addEventListener("input",function(eve){
				var e = eve || window.event;
				var target = e.target || e.srcElement;
				if(target.tagName == "INPUT"){
					that.id = target.parentNode.parentNode.getAttribute("index");
					that.changeCookie(function(i){
						that.goods[i].num = target.value;
					})
				}
			})
        }
        // 点击复选框发生的事情
        checkBox(target){
            if(target.className=="cbox"){
                this.pay();
            }
        }
        // 改变结算的价格
        pay(){
            var off=true;
                var num=0;
                for(var i=0;i<this.acbox.length;i++){
                    if(this.acbox[i].checked){
                        num+=+this.prices[i].innerHTML;
                    }else{
                        this.span.innerHTML=0;
                        off=false;
                    }
                }
                this.span.innerHTML=num;
                this.all.checked=off?true:false;
        }
        // 点击删除的时候，删除一整行，改变cookie的内容，改变结算的价格
        delete(target){
            if(target.className=="delete"){
                console.log(target.parentNode)
                let a=confirm("你真的要删除我吗？~我这么可爱...");
                if(a){
                    target.parentNode.remove();
                    this.id= target.parentNode.getAttribute("index");
                    for(var i=0;i<this.goods.length;i++){
                        if(this.goods[i].id==this.id){
                            this.goods.splice(i,1);
                            break;
                        }
                    }
                }
                    this.acbox=document.querySelectorAll(".cbox");
                    this.prices=document.querySelectorAll(".prices");
                    this.setCookie();
                    this.pay();
                }
        }

        changeCookie(cb){
            for(var i=0;i<this.goods.length;i++){
                if(this.id == this.goods[i].id){
                    cb(i);
                    break;
                }
            }
            setCookie("goodsDECookie",JSON.stringify(this.goods))
        }
        // 修改cookie的内容
        setCookie(){
            setCookie("goods",JSON.stringify(this.goods),{expires:7});
        }
    }
    new Car();
})();