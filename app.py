from flask import Flask,url_for,render_template,request,redirect,session
import config   #导入配置文件
from exts import db
from exts import cache
from Libs.send_email import code,send_email #导入生成六位数验证码的函数和发送邮件的函数
import json #导入json包用来解析数据
import redis  #连接redis: r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True),decode_responses=True是将redis读取出来的验证码转换成字符串类型，原本是二进制字节
from models import User  #导入ORM模型
from models import Grain  #导入ORM模型
from sqlalchemy import or_,and_
from functools import wraps #导入登陆限制所用相关包
import pandas as pd
import numpy as np
from Libs.GM import GM11 #导入灰色模型类
from Libs.MLR import predict_MLR #导入多元线性回归类
from Libs.RF import predict_RF  #导入随机森林类

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)
cache.init_app(app,config={'CACHE_TYPE':'redis'})

#登陆限制的装饰器
def login_required(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        if session.get('user_name'):#如果登陆了
            return func(*args,**kwargs)
        else: #如果没有登陆，则跳转到登陆页面
            return redirect(url_for('login'))
    return wrapper

@app.route('/',methods=['GET','POST'],strict_slashes=False) #首页展示试图函数
# @login_required  #添加登陆限制
@cache.cached(timeout=60*2) #flask缓存机制，设置时间为两分钟
def home():
    return render_template('home.html')

@app.route('/agriculturedata/',methods=['GET'],strict_slashes=False) #农业数据展示试图函数
# @login_required  #添加登陆限制
@cache.cached(timeout=60*2) #flask缓存机制，设置时间为两分钟
def agriculturedata():
    return render_template('agriculturedata.html')

@app.route('/getdata',methods=['GET','POST'],strict_slashes=False) #定义前端进行数据获取的路由，为post方法
def getdata():
    data = json.loads(request.get_data().decode(encoding='UTF-8'))#获取post过来的数据
    flag=data.get('flag')#获取图片标志flag
    if flag==1: #如果是第一个图，从数据库中取出小麦全国粮食人均占有量2011~21年数据并返回json
        data1=[] #设置空数组
        results=Grain.query.filter(Grain.pinlei=='人均粮食').all()
        for result in results:
            shuzhi=result.shuzhi
            data1.append(shuzhi)
        return json.dumps({'data':data1})
    if flag==2: #如果是第2个图，从数据库中取出小麦2018年全国各地产量数据并返回json
        data1 = []  # 设置空数组存放数值
        data2=[]  # 设置空数组存放地区名称
        task_filter={and_(Grain.pinlei == '小麦',Grain.zhibiao=='产量',Grain.shijian=='2018',Grain.diqu!='全国')}
        results = Grain.query.filter(*task_filter).all()
        for result in results:
            value = result.shuzhi
            name=result.diqu
            data1.append(value)
            data2.append(name)
        return json.dumps({'value':data1,'name':data2})
    if flag == 3:  # 如果是第3个图，从数据库中取出小麦全国2011-2020产量和播种面积数据并返回json
        data1 = []  # 设置空数组存放数值
        data2 = []  # 设置空数组存放地区名称
        task_filter1 = {and_(Grain.pinlei == '小麦', Grain.zhibiao == '产量', Grain.diqu == '全国')}#取出小麦全国2011-2020产量的对象
        task_filter2 = {and_(Grain.pinlei == '小麦', Grain.zhibiao == '播种面积', Grain.diqu == '全国')}  # 取出小麦全国2011-2020播种面积的对象
        results1 = Grain.query.filter(*task_filter1).all()
        results2 = Grain.query.filter(*task_filter2).all()
        for result in results1:
            chanliang = result.shuzhi
            data1.append(chanliang)
        for result in results2:
            area=result.shuzhi
            data2.append(area)
        return json.dumps({'chanliang': data1, 'area': data2})
    if flag == 7:  # 如果是第7个图，从数据库中拿出各省小麦2018年播种面积数据并返回json
        data1 = []  # 设置空数组存放数值
        data2 = []  # 设置空数组存放地区名称
        task_filter = {and_(Grain.pinlei == '小麦', Grain.zhibiao == '播种面积', Grain.shijian == '2018', Grain.diqu != '全国')}
        results = Grain.query.filter(*task_filter).all()
        for result in results:
            value = result.shuzhi
            name = result.diqu
            data1.append(value)
            data2.append(name)
        return json.dumps({'name': data2,'value': data1})
    if flag == 9:  # 如果是第9个图，从数据库中拿出11~20年粮食播种面积和农作物受灾面积数据并返回json
        data1 = []  # 设置空数组用来存放粮食播种面积
        data2=[] #设置空数组用来存放农作物受灾面积
        results1 = Grain.query.filter(Grain.pinlei == '粮食').all()
        results2 = Grain.query.filter(Grain.pinlei == '农作物受灾面积').all()
        for result in results1:
            shuzhi = result.shuzhi
            data1.append(shuzhi)
        for result in results2:
            shuzhi = result.shuzhi
            data2.append(shuzhi)
        return json.dumps({'liangshi': data1,'mianji':data2})
    if flag == 8:  #如果是第8个图，从数据库中拿出各省名称和11~18年和小麦产量数据并返回json，根据年份返回省份名称和产量的值
        shengfen_11 = []  # 存放11年省份名称
        chanliang_11 = []  # 存放11年产量名称,以此类推
        shengfen_12 = []
        chanliang_12 = []
        shengfen_13 = []
        chanliang_13 = []
        shengfen_14 = []
        chanliang_14 = []
        shengfen_15 = []
        chanliang_15 = []
        shengfen_16 = []
        chanliang_16 = []
        shengfen_17 = []
        chanliang_17 = []
        shengfen_18 = []
        chanliang_18 = []
        task_filter= {and_(Grain.pinlei == '小麦', Grain.zhibiao == '产量',Grain.diqu != '全国')}
        results = Grain.query.filter(*task_filter).all() #找出所有含有小麦、产量的数据
        for result in results:
            if result.shijian=='2011':#每一年返回一个省份数组和一个产量数组
                shengfen11=result.diqu #取出11年省份名称
                chanliang11=result.shuzhi #取出11年产量数值
                shengfen_11.append(shengfen11) #列表追加数据
                chanliang_11.append(chanliang11) #列表追加数据
            if result.shijian=='2012':
                shengfen12=result.diqu
                chanliang12=result.shuzhi
                shengfen_12.append(shengfen12)  # 列表追加数据
                chanliang_12.append(chanliang12)  # 列表追加数据
            if result.shijian=='2013':
                shengfen13=result.diqu
                chanliang13=result.shuzhi
                shengfen_13.append(shengfen13)
                chanliang_13.append(chanliang13)
            if result.shijian=='2014':
                shengfen14=result.diqu
                chanliang14=result.shuzhi
                shengfen_14.append(shengfen14)
                chanliang_14.append(chanliang14)
            if result.shijian=='2015':
                shengfen15=result.diqu
                chanliang15=result.shuzhi
                shengfen_15.append(shengfen15)
                chanliang_15.append(chanliang15)
            if result.shijian=='2016':
                shengfen16=result.diqu
                chanliang16=result.shuzhi
                shengfen_16.append(shengfen16)
                chanliang_16.append(chanliang16)
            if result.shijian=='2017':
                shengfen17=result.diqu
                chanliang17=result.shuzhi
                shengfen_17.append(shengfen17)
                chanliang_17.append(chanliang17)
            if result.shijian=='2018':
                shengfen18=result.diqu
                chanliang18=result.shuzhi
                shengfen_18.append(shengfen18)
                chanliang_18.append(chanliang18)
        return json.dumps({'shengfen_11':shengfen_11,'chanliang_11':chanliang_11,'shengfen_12':shengfen_12,'chanliang_12':chanliang_12,
                           'shengfen_13': shengfen_13, 'chanliang_13': chanliang_13,'shengfen_14':shengfen_14,'chanliang_14':chanliang_14,
                           'shengfen_15': shengfen_15, 'chanliang_15': chanliang_15,'shengfen_16':shengfen_16,'chanliang_16':chanliang_16,
                           'shengfen_17': shengfen_17, 'chanliang_17': chanliang_17,'shengfen_18':shengfen_18,'chanliang_18':chanliang_18,
                           }) #返回省份名称和产量的json数据

@app.route('/sendcode_login/',methods=['POST'],strict_slashes=False) #发送验证码的视图函数，只接收post请求,strict_slashes=False对url后的符号不做严格要求
def sendcode_login():
    data = json.loads(request.get_data().decode(encoding='UTF-8'))
    email_user = data.get('email_user')  # 获取用户邮箱账号
    codes_6 = code(6, False)  # 生成六位数字随机验证码,并加载到redis中
    r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)
    r.set('code6_login',codes_6,ex=300)#设置过期时间为5分钟
    # 将用户填写的邮箱账号作为参数进行邮箱的发送
    send = send_email(email_user, codes_6)  # 发送验证码
    if send:  # 如果发送成功
        return json.dumps({'state': 'y1', 'msg': '验证码已下放到您的邮箱，请注意查收！'})  # 返回登陆的路由，用实现页面跳转
    else:  # 如果发送失败
        return json.dumps({'state': 'y0', 'msg': '验证码发送失败，请稍后重试！'})

@app.route('/sendcode_regist/',methods=['POST'],strict_slashes=False) #发送验证码的视图函数，只接收post请求,使用g对象传递生成的验证码
def sendcode_regist():
    data = json.loads(request.get_data().decode(encoding='UTF-8'))
    email_user = data.get('email_user')  # 获取用户邮箱账号
    codes_6 = code(6, False)  # 生成六位数字随机验证码,并加载到redis中
    r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)
    r.set('code6_regist',codes_6,ex=300)#设置过期时间为5分钟
    # 将用户填写的邮箱账号作为参数进行邮箱的发送
    send = send_email(email_user, codes_6)  # 发送验证码
    if send:  # 如果发送成功
        return json.dumps({'state': 'y1', 'msg': '验证码已下放到您的邮箱，请注意查收！'})  # 返回登陆的路由，用实现页面跳转
    else:  # 如果发送失败
        return json.dumps({'state': 'y0', 'msg': '验证码发送失败！'})

@app.route('/login',methods=['GET','POST'],strict_slashes=False) #登录的视图函数
def login():
    if request.method=='GET':
        return render_template('login.html')
    else:
        #得到表单信息，进行登录校验
        data = json.loads(request.get_data().decode(encoding='UTF-8'))
        email_user=data.get('email_user')  # 获取邮箱账号
        code=data.get('code')  # 获取用户输入的验证码
        password=data.get('password')   # 获取用户的密码
        email_user_database=User.query.filter(User.email_user==email_user).first() #查看数据库中是否有用户的邮箱账号
        if email_user_database:  # 如果存在邮箱账号,则进行登陆验证
            r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)  # 连接redis,查询redis中是否存在
            code_6=r.get('code6_login') #获取redis中的验证码
            password_database=email_user_database.password  # 获取数据库中用户的密码
            if  code==code_6 and password_database==password:  #如果验证码相等,并且密码与数据库匹配，则进行session保存用户信息，并且跳转到首页
                session['user_name']=email_user_database.username  #设置session和cookie
                session.pernament=True
                return json.dumps({'state': 'h1', 'msg': '登陆成功，正在跳转到首页......', 'addr': url_for('home')})
            else : #如果验证失败,返回错误信息
                return json.dumps({'state': 'h0', 'msg': '验证码过期或者密码错误，请重新登录!', 'addr': ''})
        else: #如果没有找到邮箱，则代表还没有登录，此时跳转到注册页面
            return json.dumps({'state': 'r0', 'msg': '您还未注册本网站,请先进行注册，即将跳转到注册页面......', 'addr': url_for('regist')})

@app.route('/logout',strict_slashes=False)#注销的视图函数
def logout():
    session.clear()#删除session的信息，退出登录并跳转到登陆页面
    return redirect(url_for('login'))

@app.context_processor #上下文处理器必须返回一个字典如果没有返回值则返回空字典，字典中的key会被当成一个便变量来渲染，返回的字典在所有页面都是可用的
def my_context_processor():
    user_name=session.get('user_name') #从session中获取user_name
    if user_name:#如果找到了，则表示当前用户已经执行过登录操作
        username=User.query.filter(User.username==user_name).first() #从数据库中找到这个用户
        if username:
            return {'username':username}
    else:
        return {}

@app.route('/regist',methods=['GET','POST'],strict_slashes=False) #注册的视图函数
def regist():
    if request.method=='GET':
        return render_template('regist.html')
    else:
        #得到表单信息，进行注册校验
        data = json.loads(request.get_data().decode(encoding='UTF-8'))
        username=data.get('username')  # 获取用户名
        email_user=data.get('email_user')  # 获取邮箱账号
        code=data.get('code')  # 获取用户输入的验证码
        password=data.get('password')   # 获取用户的密码，由于前端验证过两次密码是否相等，因此此处不用验证，直接获取即可
        email_user_database=User.query.filter(User.email_user==email_user).first() #获取数据库中用户的邮箱账号
        if email_user_database:  # 如果找到了,直接跳转到登陆页面
            return json.dumps({'state':'l2','msg':'该账号已经注册，正在跳转到登陆页面,请稍后......','addr':url_for('login')})
        else:
            r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)#连接redis,查询redis中是否存在
            code_6=r.get('code6_regist')
            if code_6:#如果找到验证码，而且和用户输入的验证码相等，则将数据添加到数据库中,返回注册成功
                if(code==code_6):
                    user = User(email_user=email_user, username=username, password=password)  # 将数据添加到数据库中进行注册
                    db.session.add(user)  # 添加事务
                    db.session.commit()  # 提交事务
                    return json.dumps({'state':'l1','msg':'恭喜注册成功！正在跳转到登录页......','addr':url_for('login')})
                else: #如果验证码不相等
                    return json.dumps({'state':'l0','msg':'验证码错误，请确认后重新输入!','addr':''})
            else:#如果没有在redis中找到，则返回验证码过期
                return json.dumps({'state':'l0_1','msg':'验证码过期，请重新获取!','addr':''})

@app.route('/userinfo',methods=['GET','POST'])#修改用户信息的视图函数，此处只有在登录后才会出现，故不用登陆限制
def userinfo():
    if request.method=='GET':
        return render_template('userinfo.html')
    else:
        #得到表单信息，进行登录校验
        data = json.loads(request.get_data().decode(encoding='UTF-8'))
        username=data.get('username')  # 获取新的用户名
        password1=data.get('password1') # 获取旧密码
        password2=data.get('password2')  # 获取新密码
        username_session=session.get('user_name') #获取目前登录用户的用户名
        user = User.query.filter(User.username == username_session).first()  # 在数据库中查找当前用户对象
        if password1!=user.password: #如果原始密码与数据库中的密码不相等，则无法修改
            return json.dumps({'state': 'u0', 'msg': '原密码错误，请重新输入！', 'addr': ''})
        else:  #原密码正确，进行信息更新
            user.username = username #更改用户名
            user.passWord = password2 #更改密码
            db.session.add(user) #添加事务
            db.session.commit() #提交事务
            session.clear() #删除cookie和session
            return json.dumps({'state': 'u1', 'msg': '修改成功，请退出重新登陆!', 'addr': url_for('login')})

@app.route('/datafind_select/',methods=['GET','POST'],strict_slashes=False)  #数据查询模块的数据接口
def datafind_select():
    if request.method=='GET':
        start_time = request.args.get('start_time')#获取起始时间值
        end_time = request.args.get('end_time')#获取结束时间
        pinlei = request.args.get('pinlei')#获取品类
        zhibiao = request.args.get('zhibiao')#获取指标
        diqu = request.args.get('diqu')#获取地区
        page=int(request.args.get('page')) #获取当前页
        limit = int(request.args.get('limit')) #获取每页显示数据的条数限制
        #进行数据库中数据的查询
        if diqu=='All':#查询全国和各省的信息
            task_filter = {and_(Grain.shijian.between(start_time, end_time), Grain.pinlei == pinlei, Grain.zhibiao == zhibiao)}  # 查询条件
            pagination = Grain.query.filter(*task_filter).paginate(page, limit, False)  # 得到一个分页对象
            results = pagination.items #当前页的数据
            count = pagination.total  # 所有页数据总条数
            # print(len(results))  ############数据总条数#################
            data1 = []  # 用来存放返回的数据
            for result in results:
                temp = {}  # 设置空字典存放一次查询的结果用来给数组进行追加，每次循环置为空字典（重要）
                temp['shijian'] = result.shijian
                temp['pinlei'] = result.pinlei
                temp['zhibiao'] = result.zhibiao
                temp['diqu'] = result.diqu
                temp['danwei'] = result.danwei
                temp['shuzhi'] = result.shuzhi
                data1.append(temp)
            # print(data1)  #################返回的数据#######################
            data = {"code": 0, "msg": "", "count": count, "data": data1}
            return json.dumps(data)
        else: #如果地区不为All
            task_filter = {and_(Grain.shijian.between(start_time,end_time),Grain.pinlei == pinlei, Grain.zhibiao == zhibiao, Grain.diqu == diqu)}  #查询条件
            pagination = Grain.query.filter(*task_filter).paginate(page,limit,False) #得到一个分页对象
            results=pagination.items
            count=len(results) #数据总条数
            # print(len(results))############数据总条数#################
            data1=[] #用来存放返回的数据
            for result in results:
                temp = {} #设置空字典存放一次查询的结果用来给数组进行追加，每次循环置为空字典（重要）
                temp['shijian']=result.shijian
                temp['pinlei'] = result.pinlei
                temp['zhibiao'] = result.zhibiao
                temp['diqu'] = result.diqu
                temp['danwei'] = result.danwei
                temp['shuzhi'] = result.shuzhi
                data1.append(temp)
            # print(data1)#################返回的数据#######################
            data = {"code": 0, "msg": "", "count":count, "data": data1}
            return json.dumps(data)
    else:  #采用ajax发送post请求进行画图
        data = json.loads(request.get_data().decode(encoding='UTF-8'))  # 获取post过来的数据
        flag = data.get('flag')  # 获取图片标志flag
        start_time=data.get('start_time') #获取起始时间
        end_time=data.get('end_time') #获取结束时间
        pinlei=data.get('pinlei') #获取品类
        zhibiao=data.get('zhibiao')#获取指标
        diqu=data.get('diqu') #获取地区
        if flag == 'all_top':  # 如果地区是all,从数据库中取出所选品类2018年全国各地产量数据并返回json
            data1 = []  # 设置空数组存放数值
            data2 = []  # 设置空数组存放地区名称
            task_filter = {and_(Grain.pinlei == pinlei, Grain.zhibiao == zhibiao, Grain.shijian == '2018', Grain.diqu != '全国')}
            results = Grain.query.filter(*task_filter).all()
            for result in results:
                value = result.shuzhi
                name = result.diqu
                data1.append(value)
                data2.append(name)
            return json.dumps({'value': data1, 'name': data2})
        if flag=='all_bottom':
            data1 = []  # 设置空数组用来存放粮食播种面积
            data2 = []  # 设置空数组用来存放农作物受灾面积
            results1 = Grain.query.filter(Grain.pinlei == '粮食').all()
            results2 = Grain.query.filter(Grain.pinlei == '农作物受灾面积').all()
            for result in results1:
                shuzhi = result.shuzhi
                data1.append(shuzhi)
            for result in results2:
                shuzhi = result.shuzhi
                data2.append(shuzhi)
            return json.dumps({'liangshi': data1, 'mianji': data2})
        if flag=='top':
            task_filter = {and_(Grain.shijian.between(start_time, end_time), Grain.pinlei == pinlei, Grain.zhibiao == zhibiao,Grain.diqu==diqu)}  #查询条件
            results=Grain.query.filter(*task_filter).all()#获取到全部数据
            shuzhi=[] #设置空数组存放查询结果的value值
            shijian=[] #存放对应的地区值
            for result in results:
                shuzhi.append(result.shuzhi)#将数值添加到value中
                shijian.append(result.shijian)#将对应时间添加到shijian中
            # print(value)#################
            return json.dumps({'shuzhi':shuzhi,'shijian':shijian})

@app.route('/datafind/',strict_slashes=False) #数据查询模块的视图函数
# @login_required  #添加登陆限制
@cache.cached(timeout=60*2) #flask缓存机制，设置时间为两分钟
def datafind():
    return render_template('datafind.html')

@app.route('/predict_original',methods=['GET','POST'],strict_slashes=False)  #数据预测模块的数据接口，用来传送原始表格数据
def original():
    if request.method=='GET':
        df = pd.read_csv(r'D:\毕设文件\test.csv', encoding='gbk')  # 读取csv文件
        data1 = []
        for line in range(len(df)):
            temp = {}  # 设置空字典存放一次查询的结果用来给数组进行追加，每次循环置为空字典（重要）
            temp['nianfen'] = str(df["年份"][line])
            temp['bozhongmianji'] = str(df['播种面积'][line])
            temp['shouzaimianji'] = str(df['受灾面积'][line])
            temp['guangaimianji'] = str(df['有效灌溉面积'][line])
            temp['chanliang'] = str(df['产量'][line])
            data1.append(temp)
        data = {"code": 0, "msg": "", "count": 10,'data':data1 }
        return json.dumps(data)
    else:
        data = json.loads(request.get_data().decode(encoding='UTF-8'))  # 获取post过来的数据
        method=data.get('method')
        # print(method)#########################
        if method=='GM(1,1)': #灰色模型预测
            #调用函数进行预测
            data1 = np.array([57121, 58957, 60193.5, 60709.9, 62143.5, 61623.9, 65789, 65789, 66384, 66949])
            x = data1[0:]  # 输入数据
            predict = GM11(x, 1)
            result1 = predict['predict']['value']
            result = np.round(result1, 4)
            assess = predict['C']['desc']#模型评价
            value = predict['C']['value'] #后验差比
            np.round(value,4)
            data = [57121, 58957, 60193.5, 60709.9, 62143.5, 61623.9, 65789, 65789, 66384, 66949,result[0]]
            return json.dumps({'result':result[0],'data':data,'assess':assess,'value':value})
        # if method=='MLR': #多元线性回归
        #     result=predict_MLR()
        #     data = [57121.0, 58957.0, 60193.5, 60709.9, 62143.5, 61623.9, 65789.0, 65789.0, 66384.0, 66949.0, result[0]]
        #     return json.dumps({'result': result[0], 'data': data})
        if method=='RF': #随机森林
            data = json.loads(request.get_data().decode(encoding='UTF-8'))  # 获取post过来的数据
            shouzai = data.get('shouzai')
            bozhong = data.get('bozhong')
            guangai = data.get('guangai')
            score,Y_pred,count=predict_RF(shouzai,bozhong,guangai)
            data = [57121.0, 58957.0, 60193.5, 60709.9, 62143.5, 61623.9, 65789.0, 65789.0, 66384.0, 66949.0, Y_pred.tolist()[0]]
            return json.dumps({'result': Y_pred.tolist()[0], 'data': data,'score':score,'count':count})

@app.route('/predict',methods=['GET','POST'])#数据预测模块
# @login_required  #添加登陆限制
@cache.cached(timeout=60*2) #flask缓存机制，设置时间为两分钟
def predict():
    return render_template('predict.html')



if __name__ == '__main__':
    app.run()