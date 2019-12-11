;(function(){
    class Car{
        constructor(){
            this.url="http://localhost/shopping/data/goods.json";
            this.tbody=document.querySelector("tbody");
            this.all=document.querySelector("thead .all");
            this.load();
            this.addEvent();
            this.change();
            this.allbox();
            this.span=document.querySelector("tfoot span");
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
            ajaxGet(this.url,(res)=>{
                this.res=JSON.parse(res);
                this.getCookie();
            })
        }
        // 获取缓存
        getCookie(){
           this.goods= getCookie("goods")?JSON.parse(getCookie("goods")):[];
    
           this.display();
        }
        // 把获取到的缓存和获取到的数据进行对比之后填充页面
        display(){
            var str="";
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[i].goodsId==this.goods[j].id){
                        str+=`<tr index="${this.goods[j].id}">
                                    <td><input type="checkbox" class="cbox"></td>
                                    <td><img src="${this.res[i].img}" alt=""></td>
                                    <td>${this.res[i].name}</td>
                                    <td>${this.res[i].price}</td>
                                    <td><input type="number" min=1 value=${this.goods[j].num} class="change"></td>
                                    <td class="prices">${this.goods[j].num*this.res[i].price}</td>
                                    <td class="delete">删除</td>
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
            this.tbody.addEventListener("click",(eve)=>{
                var e=eve||window.event;
                var target=e.target||e.srcElement;
                this.delete(target);
                this.checkBox(target);
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
                var a=confirm("你真的要删除我吗？~我这么可爱...");
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
        // 修改cookie的内容
        setCookie(){
            setCookie("goods",JSON.stringify(this.goods),{expires:7});
        }
    }
    new Car();
})();