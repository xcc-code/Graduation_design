
var myChart1 = echarts.init(document.getElementById('echart1'));
option1 = {
    backgroundColor: '#000',
    globe: {
        // baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
        baseTexture: 'static/images/earth.jpg',
        shading: 'lambert',

        environment: 'static/images/starfield.jpg',

        atmosphere: {
            show: true
        },

        light: {
            ambient: {
                intensity: 0.2
            },
            main: {
                intensity: 1
            }
        }
    },
    series: []
};
myChart1.showLoading({  //showLoading遮盖层显示
    text: '数据正在加载中...',
    textStyle: { fontSize : 30 , color: '#fbfbfd' },
    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}});
myChart1.setOption(option1);// 使用上面指定的配置项和数据显示图表。
myChart1.hideLoading();//隐藏加载提示
