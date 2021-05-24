import os
from datetime import timedelta

SECRET_KEY=os.urandom(24) #设置session加密参数
PERMANENT_SESSION_LIFETIME = timedelta(hours=1.5) #设置session的过期时间是1.5小时

DEBUG=True #开启debug模式

#数据库配置
#dialect+driver://username:password@host:port/database
DIALECT='mysql'
DRIVER='pymysql'
USERNAME='root'
PASSWORD='dengfenglai521'
HOST='127.0.0.1'
PORT='3306'
DATABASE='db_bysj'
SQLALCHEMY_DATABASE_URI="{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT,DRIVER,USERNAME,PASSWORD,HOST,PORT,DATABASE)

SQLALCHEMY_TRACK_MODIFICATIONS=False #消除警告

config= {
  'CACHE_TYPE': 'redis',
  'CACHE_REDIS_HOST': 'localhost', # redis ip
  'CACHE_REDIS_PORT': 6379,  # redis port
  'CACHE_REDIS_DB': '1',   # 使用的redis db
  'CACHE_REDIS_PASSWORD': ''
}