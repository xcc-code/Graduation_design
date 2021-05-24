var myEcahrt1 = echarts.init(document.getElementById('content4'))


//表格显示数据
layui.use('table', function(){
var table = layui.table,form=layui.form;
table.render({
    elem: '#table',
    height: 590,
    width: 445,
    url: '/predict_original', //数据接口
    where:{},
    page: false, //开启分页
    limit:10,
    // limits:[13], //每页显示的条数（默认：10）
    // first: false ,//不显示首页
    // last: false ,//不显示尾页
    loading:true,//是否显示加载条（默认：true）
    // toolbar: 'default' ,//让工具栏左侧显示默认的内置模板
    cols: [[ //表头
        {field: 'nianfen', title: '年份', width:63}
        ,{field: 'bozhongmianji', title: '播种面积', width:90}
        ,{field: 'guangaimianji', title: '有效灌溉面积', width:115}
        ,{field: 'shouzaimianji', title: '受灾面积', width:86}
        ,{field: 'chanliang', title: '产量', width:85}
        ]],
    });
});




function click1(){
    var method_obj= document.getElementById('sel1');//拿到对象
    var method_index=method_obj.selectedIndex;//拿到索引
    var method=method_obj.options[method_index].value;//获取选择的算法
    var data=JSON.stringify({'method':method});//ajax发送选择的算法标志

    myEcahrt1.clear()//清除画布
    var option_right= {
    title: {
        text: '预测走势图',
        left: 'left',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f50606"}//主标题文本样式
    },
    color:'#086afd',
    tooltip: {
        axisPointer:true,
        trigger:'axis',
        link:'auto'
    },
    toolbox: {
        backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
        show: true,
        feature: {
            dataView: {//数据视图
                readOnly: false
            },
            magicType: { //切换为折线图，切换为柱状图
                type: ['line', 'bar']
            },
            saveAsImage: {}   //保存为图片
        }
    },
    legend: {
        data:['粮食产量预测'+'——'+method],
        left:150,
        top: 20,
        textStyle:{
            fontSize: 12,//字体大小
            color: '#f60707'//字体颜色
        },
    },
    grid:{
        top:100,
        x:60
    },
    xAxis: {
        data: ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#f60707',
                  fontSize: 10,//字体大小
            }
    },
    },
    yAxis:
      {
          type:'value',
          show: true,
          name:'单位：万吨',
          axisLabel: {
            show: true,
            textStyle: {
                color: '#f60707'
            }
    },
      },
    dataZoom:[{  //设置鼠标滚轮缩放
　　 type:"inside"
　　　}],
    series: [{
        name: '粮食产量预测',
        type: 'line',
        lineStyle:{
            normal:{
                width:3//设置线条粗线
            }
        },
        data: [],
    }],
};

    if(method=='GM(1,1)'){
        $('#h1').text('')
        var ii = layer.load();//显示加载动画
         $.ajax({
        url:"/predict_original",
        type:"POST",
        data:data, //发送地区data为all时上部图的标志
        dataType:"json",
        contentType :"application/json;charsetset=UTF-8",//必须
        async:true,//异步
        success:function(data){
            //绘制走势图
            myEcahrt1.setOption(option_right)
            myEcahrt1.setOption({
             series: [{
                 name:'粮食产量预测'+'——'+method,
                 data: data.data     //flask传递过来的数据data
             }]});
            $('#h1').text(data.result)
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.msg('后验差比为：'+data.value+'&nbsp&nbsp&nbsp&nbsp&nbsp'+data.assess,{time:6000});
            });
        },
        error:function(){
        }
    });
    layer.close(ii);//关闭加载动画
    }
    if(method=='RF'){
        $('#h1').text('')
        //弹出一个页面层
        layer.open({
            title: ['请输入预测指标：', 'font-size:18px;text-align:left'],
            offset:['250px','1050px'],//定义top、left
            type:1,
            area: ['600px', '360px'],
            shadeClose: true, //点击遮罩关闭
            content: '<form class="layui-form">\n' +
                '  <div class="layui-form-item">\n' +
                '    <label class="layui-form-label">播种面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input id="bozhong" lay-verify="required" type="text" name="" placeholder="请输入" autocomplete="on" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>'+
                 '  <div class="layui-form-item">\n' +
                '    <label class="layui-form-label">灌溉面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input id="guangai" lay-verify="required" type="text" name="" placeholder="请输入" autocomplete="on" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>'+
                 '  <div class="layui-form-item">\n' +
                '    <label class="layui-form-label">受灾面积</label>\n' +
                '    <div class="layui-input-block">\n' +
                '      <input id="shouzai" lay-verify="required" type="text" name="" placeholder="请输入" autocomplete="on" class="layui-input">\n' +
                '    </div>\n' +
                '  </div>'+
                '<button id="body" type="button" class="layui-btn" onclick="click2()">提交指标</button>'+
               '</form>'
        });
    }
}
function click2(){
    //弹出一个loading层
    var ii = layer.load();
    var method='RF'
    var shouzai= document.getElementById('shouzai').value;
    var bozhong= document.getElementById('bozhong').value;
    var guangai= document.getElementById('guangai').value;
    if((!shouzai) || (!bozhong) || (!guangai)){
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.close(ii);
            layer.msg('请输入指标！');
        });
    }else {
        var data1=JSON.stringify({'method':method,'shouzai':shouzai,'bozhong':bozhong,'guangai':guangai});//ajax发送选择的算法标志
        myEcahrt1.clear()//清除画布
        var option_right= {
    title: {
        text: '预测走势图',
        left: 'left',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f50606"}//主标题文本样式
    },
    color:'#086afd',
    tooltip: {
        axisPointer:true,
        trigger:'axis',
        link:'auto'
    },
    toolbox: {
        backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
        show: true,
        feature: {
            dataView: {//数据视图
                readOnly: false
            },
            magicType: { //切换为折线图，切换为柱状图
                type: ['line', 'bar']
            },
            saveAsImage: {}   //保存为图片
        }
    },
    legend: {
        data:['粮食产量预测'+'——'+method],
        left:150,
        top: 20,
        textStyle:{
            fontSize: 12,//字体大小
            color: '#f60707'//字体颜色
        },
    },
    grid:{
        top:100,
        x:60
    },
    xAxis: {
        data: ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#f60707',
                  fontSize: 10,//字体大小
            }
    },
    },
    yAxis:
      {
          type:'value',
          show: true,
          name:'单位：万吨',
          axisLabel: {
            show: true,
            textStyle: {
                color: '#f60707'
            }
    },
      },
    dataZoom:[{  //设置鼠标滚轮缩放
　　 type:"inside"
　　　}],
    series: [{
        name: '粮食产量预测',
        type: 'line',
        lineStyle:{
            normal:{
                width:3//设置线条粗线
            }
        },
        data: [],
    }],
};

        //  //弹出一个loading层
        // var ii = layer.load();
        // //此处用setTimeout演示ajax的回调
        // setTimeout(function(){
        //   layer.close(ii);
        // }, 1500);


        $.ajax({
            url:"/predict_original",
            type:"POST",
            data:data1, //发送地区data为all时上部图的标志
            dataType:"json",
            contentType :"application/json;charsetset=UTF-8",//必须
            async:true,//异步
            success:function(data){
                //绘制走势图
                myEcahrt1.showLoading({  //showLoading遮盖层显示
                    text: '数据正在加载中...',
                    textStyle: { fontSize : 30 , color: '#fbfbfd' },
                    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
                });
                myEcahrt1.setOption(option_right)
                myEcahrt1.setOption({
                 series: [{
                     name:'粮食产量预测'+'——'+method,
                     data: data.data     //flask传递过来的数据data
                 }]});
                myEcahrt1.hideLoading();//隐藏加载提示
                $('#h1').text(data.result)
                layui.use('layer', function(){
                   var layer = layui.layer;
                   layer.msg('模型得分为：'+data.score+'\r'+'&nbsp&nbsp&nbsp&nbsp&nbsp'+'训练次数为：'+data.count,{time:10000});
                });
                layer.close(ii);
            },
            error:function(){
            }
        });
    }
}

