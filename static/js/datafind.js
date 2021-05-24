//词云图的js代码
var myEcahrt = echarts.init(document.getElementById('top_right'), 'white', {renderer: 'canvas'});
var option = {
    "animation": true,
    "animationThreshold": 2000,
    "animationDuration": 2000,
    "animationEasing": "cubicOut",
    "animationDelay": 1000,
    "animationDurationUpdate": 3000,
    "animationEasingUpdate": "cubicOut",
    "animationDelayUpdate": 2000,
    "color": [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3",
        "#f05b72",
        "#ef5b9c",
        "#f47920",
        "#905a3d",
        "#fab27b",
        "#2a5caa",
        "#444693",
        "#726930",
        "#b2d235",
        "#6d8346",
        "#ac6767",
        "#1d953f",
        "#6950a1",
        "#918597"
    ],
    "series": [
        {
            "type": "wordCloud",
            "shape": "circle",
            "rotationRange": [
                -90,
                90
            ],
            "rotationStep": 45,
            "girdSize": 20,
            "sizeRange": [
                12,
                60
            ],
            "data": [
                {
                    "name": "大数据",
                    "value": 26,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(171,239,12)"
                        }
                    }
                },
                {
                    "name": "小麦",
                    "value": 40,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(11,234,155)"
                        }
                    }
                },
                {
                    "name": "大豆",
                    "value": 41,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(198,7,20)"
                        }
                    }
                },
                {
                    "name": "玉米",
                    "value": 39,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(232,170,104)"
                        }
                    }
                },
                {
                    "name": "产量",
                    "value": 29,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(9,140,227)"
                        }
                    }
                },
                {
                    "name": "人均",
                    "value": 27,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(150,10,236)"
                        }
                    }
                },
                {
                    "name": "预测",
                    "value": 40,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(174,234,10)"
                        }
                    }
                },
                {
                    "name": "面积",
                    "value": 30,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(177,36,136)"
                        }
                    }
                },
                {
                    "name": "河南",
                    "value": 29,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(243,240,240)"
                        }
                    }
                },
                {
                    "name": "粮食安全",
                    "value": 31,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(222,238,10)"
                        }
                    }
                },
                {
                    "name": "玉米",
                    "value": 33,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(240,241,243)"
                        }
                    }
                },
                {
                    "name": "干旱",
                    "value": 32,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(222,238,10)"
                        }
                    }
                },
                {
                    "name": "农业",
                    "value": 34,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(14,203,137)"
                        }
                    }
                },
                {
                    "name": "随机森林",
                    "value": 28,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(5,52,222)"
                        }
                    }
                },
                {
                    "name": "灰色模型",
                    "value": 32,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(163,4,220)"
                        }
                    }
                },
                 {
                    "name": "节约",
                    "value": 26,
                    "textStyle": {
                        "normal": {
                            "color": "rgb(18,149,189)"
                        }
                    }
                },

            ],
            "drawOutOfBound": true,
            "textStyle": {
                "emphasis": {}
            }
        }
    ],
    "legend": [
        {
            "data": [],
            "selected": {}
        }
    ],
    "tooltip": {
        "show": true,
        "trigger": "item",
        "triggerOn": "mousemove|click",
        "axisPointer": {
            "type": "line"
        },
        "showContent": true,
        "alwaysShowContent": true,
        "showDelay": 100,
        "hideDelay": 100,
        "textStyle": {
            "fontSize": 14
        },
        "borderWidth":100,
        "padding": 5
    }
};
myEcahrt.setOption(option);



//使用layui发送查询条件，方法为GET请求,使用ajax发送post请求，进行图形的渲染
function click1(){
var start_time_obj= document.getElementById('sel1');
var end_time_obj= document.getElementById('sel2');
var pinlei_obj= document.getElementById('sel3');
var zhibiao_obj= document.getElementById('sel4');
var diqu_obj= document.getElementById('sel5');

var start_time_index=start_time_obj.selectedIndex;//拿到索引
var end_time_index=end_time_obj.selectedIndex;
var pinlei_index=pinlei_obj.selectedIndex;
var zhibiao_index=zhibiao_obj.selectedIndex;
var diqu_index=diqu_obj.selectedIndex;

var start_time=start_time_obj.options[start_time_index].value;//获取起始时间值
var end_time=end_time_obj.options[end_time_index].value;//获取结束时间
var pinlei=pinlei_obj.options[pinlei_index].value;//获取品类
var zhibiao=zhibiao_obj.options[zhibiao_index].value;//获取指标
var diqu=diqu_obj.options[diqu_index].value;//获取地区

//弹出一个loading层
var ii = layer.load();
//此处用setTimeout演示ajax的回调
setTimeout(function(){
  layer.close(ii);
}, 300);

//显示右边两张echarts图表
var data_all_top=JSON.stringify({'flag': 'all_top','start_time':start_time,'end_time':end_time,'pinlei':pinlei,'zhibiao':zhibiao,'diqu':diqu});//地区为all时上部图的标志
var data_all_bottom=JSON.stringify({'flag': 'all_bottom','start_time':start_time,'end_time':end_time,'pinlei':pinlei,'zhibiao':zhibiao,'diqu':diqu});//地区为all时下部图的标志
var data_top=JSON.stringify({'flag': 'top','start_time':start_time,'end_time':end_time,'pinlei':pinlei,'zhibiao':zhibiao,'diqu':diqu});//地区不是All时候上面的图

// 基于准备好的dom，初始化echarts实例
var myChart_all_top = echarts.init(document.getElementById('right_1')); //当地区为all时上面的echarts
var myChart_all_bottom = echarts.init(document.getElementById('right_2')); //当地区为all时下面的echarts
// var myChart_top = echarts.init(document.getElementById('right_1')); //当地区不为all时上面的echarts
// var myChart_bottom = echarts.init(document.getElementById('right_2')); //当地区不为all时下面的echarts

var option_all_top = { // 当地区为all时指定上部图表的配置项和数据,饼图
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
        text: '',
        left: 'left',
        textStyle:{"fontSize": 16,"fontWeight": "bolder","color": "#f2f2f6"}//主标题文本样式
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        show:false,
        orient: 'vertical',
        left: 'left',
        top:'bottom',
        color:'#03e321',
        // data:['陕西','四川','甘肃'],
        // selected:{
        //     '陕西':true,
        //     '四川':true,
        //     '甘肃':true
        // },
        textStyle:{
            fontSize: 10,//字体大小
            color: '#0cabf3'//字体颜色
        },
    },
    series: [{
            name: '',
            type: 'pie', //饼图
            // roseType: 'area',//设置为南丁格尔图
            radius: '80%',
            data: []
        }]
};

var option_all_bottom = { //地区为All时下部图
    title: {
        text: '',
        left: 'left',
        top:'20px',
        textStyle:{"fontSize": 12,"fontWeight": "bolder","color": "#f2f2f6"}//主标题文本样式
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['农作物受灾面积', '粮食播种面积'],
        left:'90px',
        top:'20px',
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
			// margin:15,
			textStyle: {
				color: '#0ce73d',
				fontStyle: 'normal',
				fontFamily: '微软雅黑',
				fontSize: 10,
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
                        if ( p == rowNumber - 1) {
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
					fontSize: 10,
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

var option_top = {     //地区不为All时的上部图，颜色渐变折线图  // backgroundColor: '#d7d7af',
    title: {
        text: '',
        left: '12%',
        top: '13%',
        textStyle: {
            color: '#ea0a0a',
            fontSize: 14
        }
    },
    legend: {
        show: true,
        icon: 'circle',
        top: '5%',
        itemWidth: 6,
        itemHeight: 6,
        itemGap: 25,
        textStyle:{
            fontSize: 12,//字体大小
            color: '#dae2de'//字体颜色
        },
    },
    tooltip: {
        trigger: 'axis'
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
    xAxis: [{
        type: 'category',
        // data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017','2018','2019','2020'],
        data:[],
        axisLine: {
            lineStyle: {
                color: '#ef0808'
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#0bec0b'
            },
            margin: 15
        },
        boundaryGap: false
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#ef0606'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#0bec0b'
            }
        },
        splitLine: {
            show: true
        }
    }],
    series: [{
        name: '',
        type: 'line',
        data: [],//设置为空数组,Ajax进行渲染
        symbolSize: 6,
        symbol: 'circle',
        smooth: true,
        lineStyle: {
            color: '#fe9a8b'
        },
        itemStyle: {
            normal: {
                color: '#fe9a8b',
                borderColor: '#fe9a8b'
            }
        },
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#fe9a8bb3'
                    },
                    {
                        offset: 1,
                        color: '#fe9a8b03'
                    }
                ])
        },
        emphasis: {
            itemStyle: {
                color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                                offset: 0,
                                color: '#fe9a8b'
                            },
                            {
                                offset: 0.4,
                                color: '#fe9a8b'
                            },
                            {
                                offset: 0.5,
                                color: '#fff'
                            }, {
                                offset: 0.7,
                                color: '#fff'
                            }, {
                                offset: 0.8,
                                color: '#fff'
                            }, {
                                offset: 1,
                                color: '#fff'
                            }
                        ]
                    },
                    borderColor: '#0df311',
                    borderWidth: 2
            }
        }
    }
    ]
};

var option_bottom = {
    backgroundColor: '#000',
    globe: {
        // baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
        baseTexture: '../static/images/earth.jpg',
        shading: 'lambert',

        environment: '../static/images/starfield.jpg',

        atmosphere: {
            show: true
        },

        light: {
            ambient: {
                intensity: 0.3
            },
            main: {
                intensity: 1.5
            }
        }
    },
    series: []
};

if (start_time>end_time){
    alert('请选择正确的时间！')
}
else {
    //表格显示数据
    layui.use('table', function(){
    var table = layui.table,form=layui.form;
    table.render({
        elem: '#table',
        height: 615,
        width: '100%',
        url: '/datafind_select/', //数据接口
        where:{'start_time':start_time,'end_time':end_time,'pinlei':pinlei,'zhibiao':zhibiao,'diqu':diqu},
        page: true, //开启分页
        limit:13,
        limits:[13], //每页显示的条数（默认：10）
        // first: false ,//不显示首页
        // last: false ,//不显示尾页
        loading:true,//是否显示加载条（默认：true）
        // toolbar: 'default' ,//让工具栏左侧显示默认的内置模板
        cols: [[ //表头
            {field: 'shijian', sort:true, title: '时间', width:126}
            ,{field: 'pinlei', title: '品类', width:126}
            ,{field: 'zhibiao', title: '指标', width:126}
            ,{field: 'diqu', title: '地区', width:126}
            ,{field: 'danwei', title: '单位', width: 126}
            ,{field: 'shuzhi', title: '数值',width: 127}
            ]],
        });
    });

    if (diqu=='All'){ //地区为All时上部图片
        $.ajax({
        url:"/datafind_select",
        type:"POST",
        data:data_all_top, //发送地区为all时上部图的标志
        dataType:"json",
        contentType :"application/json;charsetset=UTF-8",//必须
        async:true,//异步
        success:function(data){
            data2=[]
            for (i=0;i<data.name.length;i++){
                data2.push({'value':data.value[i],'name':data.name[i]});
            }
            myChart_all_top.setOption({
                series: [{
                     name:pinlei+zhibiao,
                     data:data2
                    }]
                });
            },
            error:function(){
            }
        });
        myChart_all_top.showLoading({  //showLoading遮盖层显示
        text: '数据正在加载中...',
        textStyle: { fontSize : 30 , color: '#fbfbfd' },
        effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
        myChart_all_top.clear()
        myChart_all_top.setOption(option_all_top);// 使用上面指定的配置项和数据显示图表。
        myChart_all_top.hideLoading();//隐藏加载提示


        $.ajax({
        url:"/datafind_select",
        type:"POST",
        data:data_all_bottom,
        dataType:"json",
        contentType :"application/json;charsetset=UTF-8",//必须
        async:true,//异步,同步的话在未完成请求时会送钉浏览器
        success:function(data){
            myChart_all_bottom.setOption({
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
        myChart_all_bottom.showLoading({  //showLoading遮盖层显示
            text: '数据正在加载中...',
            textStyle: { fontSize : 30 , color: '#fbfbfd' },
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
        myChart_all_bottom.clear()
        myChart_all_bottom.setOption(option_all_bottom);// 使用上面指定的配置项和数据显示图表。
        myChart_all_bottom.hideLoading();//隐藏加载提示
    }
    else {//如果地区不是All，则根据返回的条件进行渲染页面
        $.ajax({
        url:"/datafind_select",
        type:"POST",
        data:data_top, //发送地区不为all时上部图的标志
        dataType:"json",
        contentType :"application/json;charsetset=UTF-8",//必须
        async:true,//异步
        success:function(data){
            // myChart_all_top.setOption({
            //     series: [{
            //          name:pinlei+zhibiao,
            //          data:data.value
            //         }]
            //     });

            // shijian=[] //存放时间
            // shuzhi=[]//存放数值
            // for (i=0;i<data.shijian.length;i++){
            //     shijian.push({'shijian':data.shijian[i]})
            //     shuzhi.push({'shuzhi':data.shuzhi[i]})
            // }
            myChart_all_top.setOption({
            xAxis: [{
                data:data.shijian,
            }],
            series: [{
                 name:pinlei+zhibiao,
                 data:data.shuzhi
                }]
            });
            },
            error:function(){
            }
        });
        myChart_all_top.showLoading({  //showLoading遮盖层显示
        text: '数据正在加载中...',
        textStyle: { fontSize : 30 , color: '#fbfbfd' },
        effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
        myChart_all_top.clear()
        myChart_all_top.setOption(option_top);// 使用上面指定的配置项和数据显示图表。
        myChart_all_top.hideLoading();//隐藏加载提示

        //地区不是all时下部图表
        myChart_all_bottom.showLoading({  //showLoading遮盖层显示
            text: '数据正在加载中...',
            textStyle: { fontSize : 30 , color: '#fbfbfd' },
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
        });
        myChart_all_bottom.clear()//清除画布
        myChart_all_bottom.setOption(option_bottom);// 使用上面指定的配置项和数据显示图表。
        myChart_all_bottom.hideLoading();//隐藏加载提示

    }
}
}



