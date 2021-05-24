import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

#导入数据
def predict_MLR():
    df = pd.read_csv(r"D:\毕设文件\predict.csv",header=None,encoding='gbk') #导入数据集
    df.drop([0],inplace=True)
    del df[0]
    X=df.drop([3],axis=1)
    Y=df[3]
    X_train=X
    Y_train=Y
    X_test=[['19960','116768']]
    scaler=StandardScaler().fit(X_train)#利用训练集计算标准化的参数
    X_train=scaler.transform(X_train)#利用上面计算的参数标准化训练集和测试集
    X_test = scaler.transform(X_test)
    model = LinearRegression(normalize=True)
    model.fit(X_train,Y_train)
    Y_pred=model.predict(X_test)#预测
    return np.round(Y_pred,2)  #返回预测数据
#函数调用
# print(predict_MLR())









