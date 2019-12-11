;(function(){
    "use strict";
    class Login{
        constructor(){
            this.user = document.getElementById("user")
            this.pass = document.getElementById("pass")
            this.reg = document.getElementById("reg")
            this.log = document.querySelector(".log")
            this.em = document.querySelector(".em")
            this.num = document.getElementById("VerifyCode")
            
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.log.onclick = function(){
                that.u = that.user.value;
                that.p = that.pass.value;
                that.num = that.num.value;
                
                that.getMsg();
            }
            this.reg.onclick = function(){
                location.href = "register.html";
            }
        }
        getMsg(){
            this.msg = getCookie("userMsg") ? JSON.parse(getCookie("userMsg")) : [];
            
            var type = 0;
            for(var i=0;i<this.msg.length;i++){
                if(this.msg[i].user == this.u && this.msg[i].pass == this.p && this.msg[i].num == this.num){
                    location.href = "index.html";
                    this.msg[i].onoff = 1;
                    setCookie("userMsg",JSON.stringify(this.msg))
                    type = 1;
                }else if(this.msg[i].user == this.u && this.msg[i].pass != this.p){
                    this.em.innerHTML = "密码错误，请重新输入！";
                    type = 2;
                }else if(this.msg[i].user == this.u && this.msg[i].pass == this.p && this.msg[i].num !== this.num){
                    this.em.innerHTML = "验证码错误，请重新输入！";
                    type = 2;
                }
            }
            if(type == 0){
                this.em.innerHTML = "用户名不存在,请先&nbsp<a href='register.html'>注册</a>";
            }
        }
    }
    
    new Login;

    class Code{
        constructor(){
            this.num = document.getElementById("VerifyCode");
            this.rnum = document.querySelector(".randomNum");
            this.gray = document.getElementById("gray");

            this.random1();
        }
        random1(){
            var that = this;
            this.gray.onclick = function(){
                console.log(that.rnum);
                var str = "";
                for(var i=0;i<40;i++){
                    str += random(0,9);
                    str += String.fromCharCode(random(97,122));
                    str += String.fromCharCode(random(65,90));
                }
                var s = "";
                for(var i=0;i<4;i++){
                    s += str[random(0,str.length-1)]
                }
                that.rnum.innerHTML = s;
                function random(a,b){
                    return Math.round(Math.random()*(a-b))+b;
                }

            }
        }
    }

    new Code;    
})();


