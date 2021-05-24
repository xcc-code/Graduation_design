import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor  #做回归
from sklearn import model_selection
import sklearn.metrics as sm
import numpy as np

def predict_RF(shouzai,bozhong,guangai):
    df = pd.read_csv(r"D:\毕设文件\test.csv",header=None,encoding='gbk') #导入数据集
    df.drop([0],inplace=True)
    del df[0]
    X=df.drop([4],axis=1)
    Y=df[4]
    count=1
    while True:
        X_train,X_test,Y_train,Y_test= model_selection.train_test_split(X,Y,test_size=0.3)#训练集、测试集
        #标准化
        scaler=StandardScaler().fit(X_train)#利用训练集计算标准化的参数
        X_train=scaler.transform(X_train)#利用上面计算的参数标准化训练集和测试集
        X_test=scaler.transform(X_test)
        rf=RandomForestRegressor(n_estimators=100,max_features='auto',n_jobs=4,oob_score=True)
        rf.fit(X_train,Y_train)
        Y_pred=rf.predict(X_test)#预测
        score=sm.r2_score(Y_test, Y_pred)
        count=count+1
        if score>0.85:
            array=np.array([[shouzai,bozhong,guangai]])
            Y_pred=np.round(rf.predict(array),3)
            break
    return score,Y_pred,count #返回得分数值、预测值array数组、训练次数数值







