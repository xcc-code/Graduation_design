#这个文件用来解决循环引用
from flask_sqlalchemy import SQLAlchemy
db=SQLAlchemy() #创建ORM模型
from flask_cache import Cache
cache=Cache()
