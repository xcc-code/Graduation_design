# import pandas as pd
# import numpy as np
# # import matplotlib.pyplot as plt
# # import matplotlib
# #
# # matplotlib.rcParams['font.sans-serif'] = ['FangSong'] # 指定默认字体
# # matplotlib.rcParams['axes.unicode_minus'] = False # 解决保存图像是负号'-'显示为方块的问题
# # #作为初始化的方法，我们希望它能将数据格式化存储，并且可使用的类型越多越好，在这里我先实现能处理三种类型：
# # # 一维列表、DataFrame、Series。如果处理DataFrame可能会出现不止一维的情况，于是设定一个参数datacolumn，
#
# class GrayForecast():
#     # 用于处理传入DataFrame不止一列数据到底用哪个的问题
#     def __init__(self, data, datacolumn=None):
#         if isinstance(data, pd.core.frame.DataFrame):
#             self.data=data
#             try:
#                 self.data.columns = ['数据']
#             except:
#                 if not datacolumn:
#                     raise Exception('您传入的dataframe不止一列')
#                 else:
#                     self.data = pd.DataFrame(data[datacolumn])
#                     self.data.columns=['数据']
#         elif isinstance(data, pd.core.series.Series):
#             self.data = pd.DataFrame(data, columns=['数据'])
#         else:
#             self.data = pd.DataFrame(data, columns=['数据'])
#
#         self.forecast_list = self.data.copy()
#
#         if datacolumn:
#             self.datacolumn = datacolumn
#         else:
#             self.datacolumn = None
#         #save arg:
#         #        data                DataFrame    数据
#         #        forecast_list       DataFrame    预测序列
#         #        datacolumn          string       数据的含义
#     def level_check(self):
#         # 数据级比校验
#         n = len(self.data)
#         lambda_k = np.zeros(n-1)
#         for i in range(n-1):
#             lambda_k[i] = self.data.ix[i]["数据"]/self.data.ix[i+1]["数据"]
#             if lambda_k[i] < np.exp(-2/(n+1)) or lambda_k[i] > np.exp(2/(n+2)):
#                 flag = False
#         else:
#             flag = True
#         self.lambda_k = lambda_k
#         if not flag:
#             print("级比校验失败，请对X(0)做平移变换")
#             return False
#         else:
#             print("级比校验成功，请继续")
#             return True
#     #save arg:
#     #        lambda_k            1-d list
#     def GM_11_build_model(self, forecast=5):
#         if forecast > len(self.data):
#             raise Exception('您的数据行不够')
#         X_0 = np.array(self.forecast_list['数据'].tail(forecast))
#     #       1-AGO
#         X_1 = np.zeros(X_0.shape)
#         for i in range(X_0.shape[0]):
#             X_1[i] = np.sum(X_0[0:i+1])
#     #       紧邻均值生成序列
#         Z_1 = np.zeros(X_1.shape[0]-1)
#         for i in range(1, X_1.shape[0]):
#             Z_1[i-1] = -0.5*(X_1[i]+X_1[i-1])
#
#         B = np.append(np.array(np.mat(Z_1).T), np.ones(Z_1.shape).reshape((Z_1.shape[0], 1)), axis=1)
#         Yn = X_0[1:].reshape((X_0[1:].shape[0], 1))
#
#         B = np.mat(B)
#         Yn = np.mat(Yn)
#         a_ = (B.T*B)**-1 * B.T * Yn
#
#         a, b = np.array(a_.T)[0]
#
#         X_ = np.zeros(X_0.shape[0])
#         def f(k):
#             return (X_0[0]-b/a)*(1-np.exp(a))*np.exp(-a*(k))
#
#         self.forecast_list.loc[len(self.forecast_list)] = f(X_.shape[0])
#
#     def forecast(self, time=5, forecast_data_len=5):
#         for i in range(time):
#             self.GM_11_build_model(forecast=forecast_data_len)
#
#     #打印当前预测序列
#     def log(self):
#         res = self.forecast_list.copy()
#         if self.datacolumn:
#             res.columns = [self.datacolumn]
#         return res
#
#     #初始化序列
#     def reset(self):
#         self.forecast_list = self.data.copy()
    #
    # #作图
    # def plot(self):
    #     self.forecast_list.plot()
    #     if self.datacolumn:
    #         plt.ylabel(self.datacolumn)
    #         plt.legend([self.datacolumn])
#调用函数示例
# f = open("D:\毕设文件\predict.csv", encoding="gbk")
# df = pd.read_csv(f)
# gf = GrayForecast(df, '产量')
# gf.forecast(1)
# gf.log()
# print(gf.log())
# result=np.round(gf.log().values[-1],2) #取后两位小数
# print(result)
import numpy as np

def GM11(x, n):
    '''
    灰色预测
    x：序列，numpy对象
    n:需要往后预测的个数
    '''
    x1 = x.cumsum()  # 一次累加
    z1 = (x1[:len(x1) - 1] + x1[1:]) / 2.0  # 紧邻均值
    z1 = z1.reshape((len(z1), 1))
    B = np.append(-z1, np.ones_like(z1), axis=1)
    Y = x[1:].reshape((len(x) - 1, 1))
    # a为发展系数 b为灰色作用量
    [[a], [b]] = np.dot(np.dot(np.linalg.inv(np.dot(B.T, B)), B.T), Y)  # 计算参数
    result = (x[0] - b / a) * np.exp(-a * (n - 1)) - (x[0] - b / a) * np.exp(-a * (n - 2))
    S1_2 = x.var()  # 原序列方差
    e = list()  # 残差序列
    for index in range(1, x.shape[0] + 1):
        predict = (x[0] - b / a) * np.exp(-a * (index - 1)) - (x[0] - b / a) * np.exp(-a * (index - 2))
        e.append(x[index - 1] - predict)
    S2_2 = np.array(e).var()  # 残差方差
    C = S2_2 / S1_2  # 后验差比
    if C <= 0.35:
        assess = '后验差比<=0.35，模型精度等级为好'
    elif C <= 0.5:
        assess = '后验差比<=0.5，模型精度等级为合格'
    elif C <= 0.65:
        assess = '后验差比<=0.65，模型精度等级为勉强'
    else:
        assess = '后验差比>0.65，模型精度等级为不合格'
    # 预测数据
    predict = list()
    for index in range(x.shape[0] + 1, x.shape[0] + n + 1):
        predict.append((x[0] - b / a) * np.exp(-a * (index - 1)) - (x[0] - b / a) * np.exp(-a * (index - 2)))
    predict = np.array(predict)
    return {
        'a': {'desc': '发展系数','value': a },
        'b': {'desc': '灰色作用量','value': b },
        'predict': {'desc': '第%d个预测值' % n,'value': result,},
        'C': {'desc': assess,'value': C},
        'predict': {'desc': '往后预测%d个的序列' % (n),'value': predict},
    }

# #调用示例
# data = np.array([57121, 58957, 60193.5, 60709.9, 62143.5, 61623.9, 65789,65789,66384,66949])
# x = data[0:]  # 输入数据
# result = GM11(x, 1)
# predict = result['predict']['value']
# predict = np.round(predict, 1)
# print('真实值:', x)
# print('预测值:', predict)
# print(result)



