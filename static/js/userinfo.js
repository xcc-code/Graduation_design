function check(){  //注册检查和验证
    var username= document.getElementById('username').value; //获取用户名
    var password1= document.getElementById('password1').value; //获取旧密码
    var password2 = document.getElementById("password2").value; //获取新密码
    //密码格式校验
    var my_password=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if(!my_password.test(password1)){
       alert("原密码格式错误，请重新输入!");
     }
    if(!my_password.test(password2)){
       alert("新密码格式错误，请重新输入!");
     }
    if((my_password.test(password1))){ //如果密码格式正确
        data=JSON.stringify({
            'username':username,//用户名
            'password1':password1, //旧密码
            'password2':password2, //新密码
        });
        $.ajax({
        url:"/userinfo",
        type:"POST",
        data:data,
        dataType:"json",//此处注销是因为知识简单的往后端传输数据，并没有返回响应，若参数存在，会出现响应预览错误问题
        contentType :"application/json;charsetset=UTF-8",//必须
        async:false, //异步
        success:function(data){
            state=data.state;
            msg=data.msg;
            addr=data.addr;
            if (state=='u0'){ //修改失败，提示信息
                alert(msg);
            }
            if(state=='u1'){ //代表修改成功，跳转到登陆页面
                alert(msg);
                window.location=addr;
            }
        },
        error:function(){
            alert('修改失败，请刷新页面重试');
        }
    })
   }
}




