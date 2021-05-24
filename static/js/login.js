
function post_code_login(){ //发送邮箱账号，以供后台发送验证码
    var email_user= document.getElementById('email_user').value;//获取邮箱账号
    var my_email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//校验邮箱
    data=JSON.stringify({'email_user':email_user});
    if ((email_user) && (my_email.test(email_user))){ //如果填写了邮箱，并且格式正确，则使用ajax向后端发送数据
        $.ajax({
            url:"/sendcode_login",
            type:"POST",
            data:data,
            dataType:"json",//此处注销是因为知识简单的往后端传输数据，并没有返回响应，若参数存在，会出现响应预览错误问题
            contentType :"application/json;charsetset=UTF-8",//必须
            async:false,
            success:function(data){
                state=data.state;
                msg=data.msg;
                if(state=='y1'){ //代表发送成功
                    alert(msg);
                }
                if(state=='y0'){ //发送失败
                    alert(msg);
                }
            },
            error:function(){
                alert('无法向服务器发送数据！');
            }
        })
        }
    else {
        alert('请输入正确的邮箱账号！');
    }
}


function check1(){  //注册检查和验证
    var email_user= document.getElementById('email_user').value; //获取邮箱账号
    var code= document.getElementById('code').value; //获取用户输入的验证码
    var password = document.getElementById("password").value; //获取密码
    //邮箱格式校验
    var my_email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    //密码格式校验
    var my_password=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if (!my_email.test(email_user)){
       alert("邮箱格式有误，请确认后重新输入！");
   }
    else if(!my_password.test(password)){
       alert("请输入正确格式的密码！");
     }

    if((my_email.test(email_user)) && (my_password.test(password))){ //如果邮箱格式正确并且密码格式正确
          data=JSON.stringify({
            'code':code,
            'email_user':email_user,
            'password':password});
            $.ajax({
            url:"/login",
            type:"POST",
            data:data,
            dataType:"json",//此处注销是因为知识简单的往后端传输数据，并没有返回响应，若参数存在，会出现响应预览错误问题
            contentType :"application/json;charsetset=UTF-8",//必须
            async:false,
            success:function(data){
                state=data.state;
                msg=data.msg;
                addr=data.addr;
                if(state=='h1'){ //代表登陆成功，跳转到首页
                    alert(msg);
                    window.location=addr;

                }
                if(state=='h0'){ //代表验证码错误
                    alert(msg);
                }
                if(state=='r0'){ //代表已经注册，跳转到登录页面
                    alert(msg);
                    window.location=addr;
                }
            },
            error:function(){
                alert('无法向服务器发送数据,请刷新页面重试！');
            }
        })
   }
}




