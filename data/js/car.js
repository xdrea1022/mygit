;(function(){
    class Car {
        constructor() {
            this.tbody = document.querySelector('tbody');
            this.url = 'http://localhost/yiguo/data/goods.json';
            this.checkall = document.getElementById('checkall');
            this.numAll = document.querySelector('.numAll');
            this.priceAll = document.querySelector('.priceAll');
            this.delAll = document.querySelector('.delAll');
            this.sum = 0;
            this.allnum = 0;
            this.allprice = 0;
            this.init();
            this.addEvent();
        }
        init() {
            var that = this;
            ajaxGet(this.url, (res) => {
                this.res = JSON.parse(res);
                this.getCookie();
            });
            this.checkall.onclick = function() {
                that.checkallclick();
            }
            this.delAll.onclick = function() {
                that.delAllclick();
            }

        }
        getCookie() {
            this.goods = getCookie('goods') ? JSON.parse(getCookie('goods')) : [];
            
            this.checkClick();
            this.display();

            // this.getCheck();
        }
        display() {
            var str = '';
            this.allnum = 0;
            this.allprice = 0;
            if (this.goods.length == []) {
                this.checkall.checked = false;
                this.numAll.value = '';
                this.priceAll.value = '';
            }
            for (var j = 0; j < this.res.length; j++) {
                for (var i = 0; i < this.goods.length; i++) {
                    if (this.res[j].goodsId === this.goods[i].id) {
                        if (this.goods[i].check == 1) {
                            this.check = 'checked';
                            this.allnum += this.goods[i].num;
                            console.log(this.allnum )
                            this.allprice += parseFloat((this.res[j].price * this.goods[i].num).toFixed(2));
                        } else {
                            this.check = '';
                        };
                        var sub = (this.res[j].price * this.goods[i].num).toFixed(2);
                       this.numAll.innerHTML = this.allnum;

                        this.priceAll.innerHTML = this.allprice.toFixed(2);
                        str += `<tr index="${this.res[j].goodsId}">
                        <td class="car-check">
                            <input type="checkbox" class="check" ${this.check}>
                        </td>
                        <td class="car-info">
                            <img src="${this.res[j].url}" alt="">
                        </td>
                        <td class="car-info">${this.res[j].name}</td>
                        <td class="car-price">￥${this.res[j].price}</td>
                        <td class="car-num">
                            <ul class="btn-numbox">
                                <li>
                                    <ul class="count quantity-form">
                                        <li><input type="button" id="num-jian" class="num-jian subtract btn" value="-"></li>
                                        <li><input type="text" class="input-num txt" id="input-num" value="${this.goods[i].num}" /></li>
                                        <li><input type="button" id="num-jia" class="num-jia add btn" value="+"></li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        <td class="car-total subtotal">￥${sub}</td>
                        <td class="car-opera delete">删除</td>
                    </tr>`;
                    }
                }
            }
            this.tbody.innerHTML = str;
        }
        addEvent() {
            var that = this;
            this.tbody.addEventListener('click', function(eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.className.indexOf('delete') !=-1) {
                    that.val = target.parentNode.getAttribute('index');
                    // console.log(that.val);                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                    that.delCookie();
                    that.display();
                }
                if (target.className.indexOf('subtract') !=-1) {
                    that.num = target.parentNode.parentNode.querySelector('#input-num').value;
                    that.val = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('index');
                    console.log(target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                    if (that.num == 1) {
                        that.num = 1;
                    } else {
                        that.numChange(function(i) {
                            that.goods[i].num--;
                        });
                        that.display();
                    }
                }
                
                if (target.className.indexOf('add') !=-1) {
                   
                    that.num = target.parentNode.parentNode.querySelector('#input-num').value;
                    that.val = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('index');
                    console.log(target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)
                    that.numChange(function(i) {
                        that.goods[i].num++;
                    });
                    that.display();
                }
                if (target.className.indexOf("check") !=-1) {
                    that.val = target.parentNode.parentNode.getAttribute('index');
                    console.log(target.parentNode.parentNode)
                    that.checkClick();
                }
            });
            this.tbody.addEventListener('input', function(eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                that.num = target.value;
                that.val = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('index');
                that.numChange(function(i) {
                    that.goods[i].num = that.num;
                });
                that.display();
            })
        }
        delCookie() {
            for (var i = 0; i < this.goods.length; i++) {
                this.i = i;
                if (this.val == this.goods[i].id) {
                    this.goods.splice(this.i, 1);
                    break;
                }
            }
            setCookie('goods', JSON.stringify(this.goods));
            this.display();
        }
        numChange(cb) {
            for (var i = 0; i < this.goods.length; i++) {
                this.i = i;
                if (this.val == this.goods[i].id) {
                    cb(this.i);
                }
            }
            setCookie('goods', JSON.stringify(this.goods));
        }
        checkboxA() {
            this.sum = 0;
            for (var i = 0; i < this.goods.length; i++) {
                this.sum += this.goods[i].check;
            }
            if (this.sum == this.goods.length) {
                this.checkall.checked = true;
            } else {
                this.checkall.checked = false;
            }
        }
        checkClick() {
            this.sum = 0;
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == this.val) {
                    console.log(this.val)
                    if (this.goods[i].check == 1) {
                        this.goods[i].check = 0;
                    } else {
                        this.goods[i].check = 1;
                        console.log(check)
                    }
                }
                this.sum += this.goods[i].check;
            }
            this.checkboxA();
            setCookie('goods', JSON.stringify(this.goods));
            this.display();
        }
        checkallclick() {
            this.goods = getCookie('goods') ? JSON.parse(getCookie('goods')) : [];
            for (var i = 0; i < this.goods.length; i++) {
                if (this.checkall.checked) {
                    this.goods[i].check = 1;
                } else {
                    this.goods[i].check = 0;
                }
            }
            setCookie('goods', JSON.stringify(this.goods));
            this.display();
        }
        delAllclick() {
            removeCookie('goods');
            this.checkall.checked = false;
            this.goods = '';
            this.display();

        }
    }
    new Car;

})();