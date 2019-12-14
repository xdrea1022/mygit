class Page{
    constructor(options){
        // 构造函数 将传入的数据加给实例
        this.url = options.url;
        this.left = options.left;
        this.right = options.right;
        this.list = options.list;
        this.pageCont = options.pageCont;
        // 如果没有传，就默认第一页
        this.index =options.index || 0;
        // 如果没有传就默认一页显示3个数据
        this.num = options.num || 3;
        // 1.开始请求数据
        this.load();
        // 4.绑定事件
        this.addEvent();
        this.addEvent1();
    }
    load(){
        // 将this提前存入that中，方便后面使用
        var that =this;
        // 1.开始请求数据
        ajaxGet(this.url,function(res){
            // 将传入的json文件转换为对象，赋值给实例上的res上
            that.res = JSON.parse(res);
            // 2.请求数据是开始渲染结构
            that.display();
            // 3.请求数据时开始渲染页码
            that.createPage();
        })
    }
    // 开始渲染结构
    display(){
        // 用字符拼接来渲染结构
        var str = "";
        // 实现每页显示的数据是num条
        for(var i=this.index*this.num;i<(this.index+1)*this.num;i++){
            // 判断当前i是否小于传入的对象的长度 （(this.index+1)*this.num这个公式会让i变很大）
            if(i<this.res.length){
                // 拼接字符串
                str += `<li index="${this.res[i].goodsId}">
                <div>
                    <img src="${this.res[i].url}" alt="">
                </div>
                <div class="p-info">
                    <p class="p-name">
                        <a>${this.res[i].name}</a>
                        <div class="p-buy">
                            <span>￥${this.res[i].price}</span>
                            <div class="addCar">加入购物车</div>
                        </div>

                    </p>
                </div>
            </li>`
            }
        }
        // 在id为list的标签中插入拼接好的数据
        this.list.innerHTML = str;
    }
    // 3.操作渲染页面
    createPage(){
        // 计算一共有多少页，对对象的长度向上取整，除以每页显示的个数，为最终页码数
        this.maxNum = Math.ceil(this.res.length / this.num);
        // 将1-maxNum之间所有的页面遍历出来，给id为pageWarp的标签里创建能显示页面的标签
        var str = "";
        for(var i = 0;i<this.maxNum;i++){
            str += `<li>${i+1}</li>`;
        }
        this.pageCont.innerHTML = str;
        // 5.开始设置当前页码的标签className为active，根据索引显示当前
        this.setActive();
    }
    setActive(){
        // 遍历id为pageWarp标签下所有的子元素
        for(var i = 0 ;i<this.pageCont.children.length;i++){
            // 清空所有子元素的className
            this.pageCont.children[i].className = "";
        }
        // 赋值当前的页码的className为active
        this.pageCont.children[this.index].className = "active";
    }
    // 加事件
    addEvent(){
        var that = this ;
        this.right.onclick = function(){
            // 5.点击时要显示的索引
            that.changeIndexR();
        }
        this.left.onclick = function(){
            that.changeIndexL();
        }
    }
    changeIndexR(){
        if(this.index == this.maxNum-1){
            this.index = 0;
        }else{
            this.index++;
        }
        // 6.重新渲染结构
        this.display();
        // 创建当前点击的标签的className为active，来实现样式的改变
        this.setActive();
    }
    changeIndexL(){
        if(this.index == 0){
            this.index = this.maxNum-1;
        }else{
            this.index--;
        }
        this.display();
        // 创建当前点击的标签的className为active，来实现样式的改变
        this.setActive();
    }
    addEvent1(){
        var that=this;
        this.list.addEventListener("click",function(eve){
            var e=eve||window.event;
            var target=e.target||e.srcElement;
            if(target.className=="addCar"){
                that.id=target.parentNode.parentNode.parentNode.getAttribute("index");  //给该构造函数添加一个可变的属性保存点击的事件id
                that.setCookie();
            }
        })
    }
    setCookie(){
     this.goods= getCookie("goods")?JSON.parse(getCookie("goods")):[];
     if(this.goods.length<1){
         this.goods.push({id:this.id,num:1})
     }else{
         var off=true;
        //  console.log(this.id);

        //  for(var i=0;i<this.goods.length;i++){
        //      if(this.goods[i].id==this.id){
        //          this.goods[i].num++;
        //          off=false;
        //      }
        //  }
        var i=0;
        var off= this.goods.some((value,index)=>{
            i=index;
            return value.id==this.id;
        });
         if(off){
             this.goods[i].num++;
         }else{
            this.goods.push({id:this.id,num:1});
         }
     }
     setCookie("goods",JSON.stringify(this.goods),{expires:7});
    }
}

new Page({
    // 因为形参最好3个以内，所以放在对象中，作为一个传进去，实参，传入地址，获取的左键id 右键id 清单。页码，默认当前为第一页，一页显示5个
    url:"http://localhost/熊德瑞/data/goods.json",
    left:document.getElementById("btnL"),
    right:document.getElementById("btnR"),
    list:document.getElementById("list"),
    pageCont:document.querySelector("#pageWarp ul"),
    index:0,
    num:8
})