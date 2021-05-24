var data1=JSON.stringify({'flag': 1});//第一个图的标志
var data2=JSON.stringify({'flag': 2});//第二个图的标志
var data3=JSON.stringify({'flag': 3});//第三个图的标志
var data7=JSON.stringify({'flag': 7});//第七个图的标志
var data8=JSON.stringify({'flag': 8});//第八个图的标志
var data9=JSON.stringify({'flag': 9});//第九个图的标志
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('echart1'));
var myChart2 = echarts.init(document.getElementById('echart2'));
var myChart3 = echarts.init(document.getElementById('echart3'));
var myChart6 = echarts.init(document.getElementById('echart6'));
var myChart7 = echarts.init(document.getElementById('echart7'));
var myChart8 = echarts.init(document.getElementById('echart8'));
var myChart9 = echarts.init(document.getElementById('echart9'));

//弹出一个loading层
var ii = layer.load();
//此处用setTimeout演示ajax的回调
setTimeout(function(){
  layer.close(ii);
}, 300);

// 指定图表1的配置项和数据
var option1= {
    title: {
        text: '粮食人均占有量(千克)',
        left: 'left',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f2f2f6"}//主标题文本样式
    },
    color:'#19bb7a',
    tooltip: {},
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
        data:['粮食人均占有量'],
        left:150,
        top: 20,
        textStyle:{
            fontSize: 12,//字体大小
            color: '#e8f3ee'//字体颜色
        },
    },
    grid:{
        top:100,
        x:45
    },
    xAxis: {
        data: ["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021"],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#07f65f'
            }
    },
    },
    yAxis:
      {
          type:'value',
          show: true,
          name:'单位：千克',
          axisLabel: {
            show: true,
            textStyle: {
                color: '#07f65f'
            }
    },
      },
    dataZoom:[{  //设置鼠标滚轮缩放
　　 type:"inside"
　　　}],
    series: [{
        name: '粮食人均占有量',
        type: 'line',
        data: [],
    }],
};
$.ajax({
    url:"/getdata",
    type:"POST",
    data:data1,
    dataType:"json",
    contentType :"application/json;charsetset=UTF-8",//必须
    async:true,//异步
    success:function(data){
        myChart1.setOption({
             series: [{
                // 根据名字对应到相应的系列
                name: '粮食人均占有量',
                data: data.data     //flask传递过来的数据data
        }]
    });},
    error:function(){
    }
})
myChart1.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart1.setOption(option1);// 使用上面指定的配置项和数据显示图表。
myChart1.hideLoading();//隐藏加载提示


// 指定图表2的配置项和数据
option2 = {
    toolbox: {
        backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
        show: true,
        feature: {
            dataView: {//数据视图
                readOnly: false
            },
            saveAsImage: {}   //保存为图片
        }
    },
    dataZoom:[{  //设置鼠标滚轮缩放
　　 type:"inside"
　　　}],
    title: {
        text: '各省小麦产量(万吨)',
        left: 'left',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f2f2f6"}//主标题文本样式
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        top:'bottom',
        color:'#03e321',
        data:['河南','山东','安徽','江苏','河北','新疆','宁夏','青海','甘肃','陕西'],
        selected:{
            '河南':true,
            '山东':true,
            '安徽':true,
            '江苏':true,
            '河北':true,
            '新疆':true,
            '宁夏':true,
            '青海':true,
            '甘肃':true,
            '陕西':true,
        },
        textStyle:{
            fontSize: 10,//字体大小
            color: '#0cabf3'//字体颜色
        },
    },
    series: [
        {
            name: '产量',
            type: 'pie', //饼图
            // roseType: 'area',//设置为南丁格尔图
            radius: '90%',
            data: [],
            // emphasis: {
            //     itemStyle: {
            //     shadowBlur: 0,//设置文字阴影
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(250,246,246,0.5)'
            //     }
            // }
        }
    ]
};
$.ajax({
    url:"/getdata",
    type:"POST",
    data:data2,
    dataType:"json",
    contentType :"application/json;charsetset=UTF-8",//必须
    async:true,//异步
    success:function(data){
        data2=[]
        for (i=0;i<data.name.length;i++){
            data2.push({'value':data.value[i],'name':data.name[i]});
        }
        myChart2.setOption({
             series: [{
                 data:data2
        }]
    });},
    error:function(){
    }
})
myChart2.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart2.setOption(option2);// 使用上面指定的配置项和数据显示图表。
myChart2.hideLoading();//隐藏加载提示


// 指定图表3的配置项和数据
var option3 = {
    title: {
        text: '小麦产量与播种面积',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f2f2f6"}//主标题文本样式
    },
    color:['#f6d609','#09f6bf'],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['产量(万吨)', '播种面积(千公顷)'],
        left:150,
        textStyle:{
            fontSize: 12,//字体大小
            color: '#e8f3ee'//字体颜色
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
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
            saveAsImage: {}, //保存为图片
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["2011", '2012', '2013', '2014', '2015', '2016', '2017','2018','2019','2020'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#07f65f'
            }
    },
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: '#07f65f'
            }
    },
    },
    dataZoom:[{  //设置鼠标滚轮缩放
　　 type:"inside"
　　　}],
    series: [
        {
            name: '产量(万吨)',
            type: 'bar',
            stack: '总量',
            data: []
        },
        {
            name: '播种面积(千公顷)',
            type: 'bar',
            stack: '总量',
            data: []
        },
    ]
};
$.ajax({
    url:"/getdata",
    type:"POST",
    data:data3,
    dataType:"json",
    contentType :"application/json;charsetset=UTF-8",//必须
    async:true,//异步
    success:function(data){
        myChart3.setOption({
             series: [
                 {
                     name: '产量(万吨)',
                     type: 'bar',
                     stack: '总量',
                     data:data.chanliang
                 },
                 {
                     name: '播种面积(千公顷)',
                     type: 'bar',
                     stack: '总量',
                     data: data.area
                 }
             ]
        });
    },
    error:function(){
    }
})
myChart3.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart3.setOption(option3);// 使用上面指定的配置项和数据显示图表。
myChart3.hideLoading();//隐藏加载提示





var colorList = [[
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
    '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
    ],
    [
    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
    ],
    [
    '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
    '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
    '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
    '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
    ]][2];
option6 = {
    // 图表标题
    title: {
        show:true,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
        text: '请点击图片查询更多信息......',//主标题文本，'\n'指定换行
        x: 'left',        // 水平安放位置，默认为左对齐，可选为：
                          // 'center' ¦ 'left' ¦ 'right'
                          // ¦ {number}（x坐标，单位px）
        y: 'top',             // 垂直安放位置，默认为全图顶端，可选为：
                          // 'top' ¦ 'bottom' ¦ 'center'
                          // ¦ {number}（y坐标，单位px）
        //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ccc',    // 标题边框颜色
        borderWidth: 0,         // 标题边框线宽，单位px，默认为0（无边框）
        padding: 5,             // 标题内边距，单位px，默认各方向内边距为5，
                                // 接受数组分别设定上右下左边距，同css
        itemGap: 10,            // 主副标题纵向间隔，单位px，默认为10，
        textStyle: {
            fontSize:15,
            fontWeight: 'bolder',
            color: '#f2f2f6'        // 主标题文字颜色
        },
        subtextStyle: {
            color: '#aaa'        // 副标题文字颜色
        }
    },
    // backgroundColor: '#2e48f1',//不添加背景，以原页面背景图片为背景
    tooltip: {},
    animationDurationUpdate: function(idx) {
        // 越往后的数据延迟越大
        return idx * 100;
    },
    animationEasingUpdate: 'bounceIn',
    color: ['#fff', '#fff', '#fff'],
    series: [{
        type: 'graph',
        layout: 'force',
        force: {
            repulsion: 200,
            edgeLength: 10
        },
        roam: true,
        label: {
            normal: {
                show: true
            }
        },
        data: [{
            "name": "谷物产量",
            "value": '61674(万吨)',
            "symbolSize": 48,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[0],
                    "color": colorList[0]
                }
            },
             'url':'/datafind'
        }, {
            "name": "全国粮食总产量",
            "value": '66949(万吨)',
            "symbolSize": 73,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[1],
                    "color": colorList[1]
                }
            },
             'url':'/datafind'
        }, {
            "name": "小麦产量",
            "value": '13168(万吨)',
            "symbolSize": 67,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[2],
                    "color": colorList[2]
                }
            },
             'url':'/datafind'
        }, {
            "name": "全国粮食播种面积",
            "value": '116768(千公顷)',
            "symbolSize": 50,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[3],
                    "color": colorList[3]
                }
            },
             'url':'/datafind'
        }, {
            "name": "玉米数据",
            "value": '请点击查看',
            "symbolSize": 100,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[4],
                    "color": colorList[4]
                }
            },
             'url':'/datafind'
        }, {
            "name": "小麦数据",
            "value": '请点击查看',
            "symbolSize": 100,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[5],
                    "color": colorList[5]
                }
            },
             'url':'/datafind'
        }, {
            "name": "大豆数据",
            "value": '请点击查看',
            "symbolSize": 100,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[6],
                    "color": colorList[6]
                }
            },
             'url':'/datafind'
        }, {
            "name": '人均粮食年产量',
            "value": '保持在470公斤，远超国际粮食安全险(400公斤)！',
            "symbolSize": 67,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[7],
                    "color": colorList[7]
                }
            },
             'url':'/datafind'
        }, {
            "name": '玉米产量',
            "value": '26067(万吨)',
            "symbolSize": 47,
            "draggable": true,
            "itemStyle": {
                "normal": {
                    "shadowBlur": 100,
                    "shadowColor": colorList[8],
                    "color": colorList[8]
                }
            },
             'url':'/datafind'
        }
        ]
    }]
}
// 点击跳转代码
myChart6.on('click', function(params) {
    console.log(params.name);
    window.location=params.data.url;
});
myChart6.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart6.setOption(option6);// 使用上面指定的配置项和数据显示图表。
setInterval(function(){myChart6.setOption(option6)} ,10000)
myChart6.hideLoading();//隐藏加载提示


var option7 = {
    title: {
        text: '各省小麦播种面积(千公顷)',
        left: 'left',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f2f2f6"}//主标题文本样式
    },
    tooltip: {
        show:true
    },
    toolbox: {
        show: true,
        orient : 'vertical',
        x: 'right',
        y: 'center',
        feature : {
            // mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: false},
            saveAsImage : {show: true}
        }
    },
    visualMap: {
        min: 0,
        max:1000,
        left: 26,
        bottom: 4,
        showLabel: false,
        text: ["高", "低"],
        color:['#6af606','#f109d2'] //设置条状颜色
    },
    geo: {
        map: "china",
        roam: true,
        scaleLimit: {
            min: 1,
            max: 2
        },
        zoom: 1.2,
        top: 55,
        label: {
            normal: {
                show: !0,
                fontSize: "14",
                color: "rgb(17,17,17)"
            }
        },
        itemStyle: {
            normal: {
                //shadowBlur: 50,
                //shadowColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: "rgb(5,58,245)"
            },
            emphasis: {
                areaColor: "#f6ba03",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 0
            }
        }
    },
    series: [{
        name: '小麦播种面积(千公顷)',
        type: "map",
        geoIndex: 0,
         data: []  // [{name:'新疆',value:800}]//先设置为空数组，然后用Ajax进行填充
    }
    ]
};
$.ajax({
    url:"/getdata",
    type:"POST",
    data:data7,
    dataType:"json",
    contentType :"application/json;charsetset=UTF-8",//必须
    async:true,//异步,同步的话在未完成请求时会送钉浏览器
    success:function(data){
        data7=[]
        for (i=0;i<data.name.length;i++){
            data7.push({'name':data.name[i],'value':data.value[i]});
        }
        myChart7.setOption({
             series: [
                 {
                     name: '小麦播种面积(千公顷)',
                     type: "map",
                     geoIndex: 0,
                     data: data7
                 },
             ]
        });
    },
    error:function(){
    }
})
myChart7.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart7.setOption(option7);// 使用上面指定的配置项和数据显示图表。
myChart7.hideLoading();//隐藏加载提示



var option9 = {
    title: {
        text: '粮食播种面积和受灾面积',
        left: 'left',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f2f2f6"}//主标题文本样式
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['农作物受灾面积', '粮食播种面积'],
        textStyle:{
            fontSize: 12,//字体大小
            color: '#dae2de'//字体颜色
        },
    },
    dataZoom:[{  //设置鼠标滚轮缩放
　　 type:"inside"
　　　}],
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            dataView : {show: true, readOnly: false},
            magicType: { //切换为折线图，切换为柱状图
                type: ['line', 'bar']
            },
            saveAsImage: {}
        }
    },
    xAxis: {
		type: 'category',
	    boundaryGap: false,//坐标轴两边留白
		data: ['2011', '2012', '2013','2014','2015','2016','2017','2018','2019', '2020'],
		axisLabel: { //坐标轴刻度标签的相关设置。
			interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
		//	margin:15,
			textStyle: {
				color: '#0ce73d',
				fontStyle: 'normal',
				fontFamily: '微软雅黑',
				fontSize: 20,
			},
			formatter:function(params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 4;  //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";
                        var start = p * provideNumber;
                        var end = start + provideNumber;
                        if (p == rowNumber - 1) {
                            tempStr = params.substring(start, paramsNameNumber);
                        } else {
                            tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr;
                    }

                } else {
                    newParamsName = params;
                }
                return newParamsName
            },
			//rotate:50,
		},
		axisTick:{//坐标轴刻度相关设置。
			show: false,
		},
		axisLine:{//坐标轴轴线相关设置
			lineStyle:{
				color:'#E5E9ED',
				// opacity:10
			}
		},
		splitLine: { //坐标轴在 grid 区域中的分隔线。
			show: true,
			lineStyle: {
				color: '#E5E9ED',
			// 	opacity:0.1
			}
		}
    },
    yAxis: [
		{
			type: 'value',
			splitNumber: 5,
			axisLabel: {
				textStyle: {
					color: '#0ce73d',
					fontStyle: 'normal',
					fontFamily: '微软雅黑',
					fontSize: 20,
				}
			},
			axisLine:{
				show: false
			},
			axisTick:{
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#E5E9ED',
				// 	opacity:0.1
				}
			}

		}
	],
    series: [
        {
            name: '农作物受灾面积',
            type: 'bar',
            itemStyle: {
		        normal: {
					color:'#3A84FF',
		            lineStyle: {
						color: "#05fa1e",
						width:3
		            },
		            areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 0,
							color: 'rgba(58,132,255,0)'
						}, {
							offset: 1,
							color: 'rgba(39,109,224,0.35)'
						}]),
		            }
		        }
			},
            data: []
        },
        {
            name: '粮食播种面积',
            type: 'bar',
            itemStyle: {
		        normal: {
		            color:'rgba(255,80,124,1)',
		            lineStyle: {
						color: "rgba(255,80,124,1)",
						width:3
		            },
		            areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 0,
							color: 'rgba(255,80,124,0)'
						}, {
							offset: 1,
							color: 'rgba(239,53,100,0.35)'
						}]),
		            }
		        }
			},
            data: []
        }
    ]
};
$.ajax({
    url:"/getdata",
    type:"POST",
    data:data9,
    dataType:"json",
    contentType :"application/json;charsetset=UTF-8",//必须
    async:true,//异步,同步的话在未完成请求时会送钉浏览器
    success:function(data){
        myChart9.setOption({
             series: [{
                 name: '农作物受灾面积',
                 data:data.mianji
             },{
                 name: '粮食播种面积',
                 data:data.liangshi
             }
             ]
        });
    },
    error:function(){
    }
})
myChart9.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart9.setOption(option9);// 使用上面指定的配置项和数据显示图表。
myChart9.hideLoading();//隐藏加载提示


//动态排名图，使用ajax先设置变量，以便后面配置调用
$.ajax({
    url:"/getdata",
    type:"POST",
    data:data8,
    dataType:"json",
    contentType :"application/json;charsetset=UTF-8",//必须
    async:true,//异步,同步的话在未完成请求时会送钉浏览器
    success:function(data){ //获取返回的省份和产量数据
        var jdData=[
            data.shengfen_11,data.shengfen_12,data.shengfen_13,data.shengfen_14,data.shengfen_15,data.shengfen_16,data.shengfen_17,data.shengfen_18
        ];
        var data=[
            data.chanliang_11,data.chanliang_12,data.chanliang_13,data.chanliang_14,data.chanliang_15,data.chanliang_16,data.chanliang_17,data.chanliang_18,
        ];
        var years = ['2011', '2012','2013', '2014', '2015','2016', '2017', '2018']; //时间轴不变
        var option8 = {
            baseOption: {
            timeline: {
                 data: years,
                 axisType: 'category',
                 autoPlay: true,
                 playInterval: 3000,//播放速度
                 left: '10%',
                 right: '10%',
                 bottom: '0%',
                 width: '80%',
                 label: {
                     normal: {
                         textStyle: {
                             color: '#efeaea',//x轴字体的颜色
                         }
                     },
                     emphasis: {
                         textStyle: {
                             color: '#fff'
                         }
                     }
                 },
                 symbolSize: 10,//底部圆圈的大小
                 lineStyle: {
                     color: '#2de50d' //x轴坐标的颜色
                 },
                 checkpointStyle: {
                     borderColor: '#f30606', //进度小圆点的颜色
                     borderWidth: 2
                 },
                 controlStyle: {
                     showNextBtn: true,
                     showPrevBtn: true,
                     normal: {
                         color: '#ff8800',//两边箭头的颜色
                         borderColor: '#ff8800' //播放按钮的颜色
                     },
                     emphasis: {
                         color: '#e30f0f',
                         borderColor: '#aaaaaa'
                     }
                 },

             },
            title: {
            text: '',
            right: '2%',
            bottom: '8%',
            textStyle: {
                     fontSize: 45,
                     color: '#eae1e1'//左下角文字颜色
                 }
             },
            tooltip: {
                'trigger': 'axis'
            },
            calculable: true,
            grid: {
                 left: '8%',
                 right: '2%',
                 bottom: '6%',
                 top: '0%',
                 containLabel: true
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#fff'
                    }
                }
             },
        yAxis: [{
             offset: '37',
             'type': 'category',
             data: '',
             nameTextStyle: {
                 color: '#fff'
             },
             axisLabel: {
                 //rotate:45,
                 textStyle: {
                     fontSize: 12,
                     color: '#efeaea', //左边文字颜色
                 },
                 interval: 0
             },
             axisLine: {

                 lineStyle: {
                     color: '#333'
                 },
             },
             splitLine: {
                 show: false,
                 lineStyle: {
                     color: '#333'
                 }
             },

         }],
         xAxis: [{
             'type': 'value',
             'name': '',

             splitNumber: 8,
             nameTextStyle: {
                 color: '#333'
             },
             axisLine: {
                 lineStyle: {
                     color: '#333'
                 }
             },
             axisLabel: {
                 formatter: '{value}',
                 show: true,
                 textStyle: {
                  color: '#07f65f'
                 }
             },
             splitLine: {
                 show: true,
                 lineStyle: {
                     color: '#e8ca09' //中间竖线的颜色
                 }
             },
         }],
         series: [{
             'name': '',
             'type': 'bar',
             markLine: {
                 label: {
                     normal: {
                         show: false
                     }
                 },
                 lineStyle: {
                     normal: {
                         color: 'red',
                         width: 3
                     }
                 },
             },
             barWidth: '50%',
             label: {
                 normal: {
                     show: true,
                     position: 'inside',
                     formatter: '{c}'
                 }
             },
             itemStyle: {
                 normal: {
                     color: function(params) {
                         var colorList = [  //设置颜色
                             '#bcd3bb', '#e88f70', '#9dc5c8', '#e1e8c8',
                             '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8',
                             '#bda29a', '#376956', '#c3bed4', '#495a80',
                             '#9966cc', '#bdb76a', '#eee8ab', '#a35015',
                             '#04dd98', '#d9b3e6', '#b6c3fc', '#315dbc','#6bc0fb', '#7fec9d', '#fedd8b', '#ffa597', '#84e4dd', '#749f83',
                             '#ca8622', '#bda29a', '#a8d8ea', '#aa96da', '#fcbad3'
                         ];
                         return colorList[params.dataIndex]
                     },

                 }
             },
         }],
         animationDurationUpdate: 2000,
         animationEasingUpdate: 'quinticInOut'
     },
     options: []
 };
 for (var n = 0; n < years.length; n++) {
     var res = [];
     //alert(jdData.length);
     for (j = 0; j < data[n].length; j++) {
         res.push({
             name: jdData[n][j],
             value: data[n][j]
         });
     }

     res.sort(function(a, b) {
         return b.value - a.value;
     }).slice(0, 6);

     res.sort(function(a, b) {
         return a.value - b.value;
     });
     var res1 = [];
     var res2 = [];
     //console.log(res);
     for (t = 0; t < res.length; t++) {
         res1[t] = res[t].name;
         res2[t] = res[t].value;
     }
     console.log(res1);
     console.log("----------------");
     console.log(jdData[n]);
     option8.options.push({
         title: {
             text: years[n] + '年产量'
         },
         yAxis: {
             data: res1,
         },
         series: [{
             data: res2
         }]
     });
 }
 myChart8.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart8.setOption(option8);// 使用上面指定的配置项和数据显示图表。
myChart8.hideLoading();//隐藏加载提示
    },
    error:function(){

    }
});

