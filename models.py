#用于建立各种数据库模型
from exts import db

class User(db.Model):
    __tablename__='user'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True) #id，设置为int类型，主键，自增长
    email_user=db.Column(db.String(320),nullable=False) #用户邮箱,长度最长为320个字符，设置为不能为空
    username=db.Column(db.String(50),nullable=False) #用户名，设置为不能为空
    password=db.Column(db.String(100),nullable=False) #密码，设置为不能为空

class Grain(db.Model):
    __tablename__='grain'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True) #id，设置为int类型，主键，自增长
    shijian=db.Column(db.Text(200),nullable=False) #时间，设置为text类型，不能为空
    pinlei=db.Column(db.Text(200),nullable=False)  #品类
    zhibiao=db.Column(db.Text(200),nullable=False)  #指标
    diqu=db.Column(db.Text(200),nullable=False)    #地区
    danwei=db.Column(db.Text(200),nullable=False)   #单位
    shuzhi=db.Column(db.String(200),nullable=False)  #数值
    # 表创建完成后需要进行映射：python manage.py db init    python manage.py db migrate      python manage.py db upgrade