#发送验证码
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
import random

def code(n,alpha):  #生成六位数的验证码
    s = '' # 创建字符串变量,存储生成的验证码
    for i in range(n):  # 通过for循环控制验证码位数
        num = random.randint(0,9)  # 生成随机数字0-9
        if alpha: # 需要字母验证码,不用传参,如果不需要字母的,关键字alpha=False
            upper_alpha = chr(random.randint(65,90))
            lower_alpha = chr(random.randint(97,122))
            num = random.choice([num,upper_alpha,lower_alpha])
        s = s + str(num)
    return s
def send_email(email_count,codes_6):  #参数：email_count是收件人邮箱账号,codes_6是要发送的六位数验证码
    my_sender = '534881507@qq.com'  # 发件人邮箱账号
    my_pass = 'sduzhfigftbibiaf'  # 发件人邮箱的授权码
    msg = MIMEText("您的验证码为："+codes_6+"，有效时间为5分钟，请尽快填写，不要轻易泄露给他人哦~", 'plain', 'utf-8')
    msg['From'] = formataddr(['', my_sender]) #括号里的对应发件人邮箱昵称、发件人邮箱账号
    msg['To'] = formataddr(['', email_count]) # 括号里的对应收件人邮箱昵称、收件人邮箱账号
    msg['Subject'] = "粮食安全分析系统" # 邮件的主题，也可以说是标题
    server = smtplib.SMTP_SSL("smtp.qq.com", 465) # 发件人邮箱中的SMTP服务器，端口是25
    server.login(my_sender, my_pass) # 括号中对应的是发件人邮箱账号、邮箱密码
    server.sendmail(my_sender, email_count, msg.as_string()) # 括号中对应的是发件人邮箱账号、收件人邮箱账号、发送邮件
    server.quit()  # 关闭连接
    return True
#函数调用示例：
# from libs.Email_send.send_email import send_email
# from libs.Email_send.send_email import code
#
# email_count='534881507@qq.com'
# codes_6=code(6,False)   #生成六位数字随机验证码
# ret = send_email(email_count,codes_6)
# if ret:
#     print("邮件发送成功")
#     print(codes_6)
# else:
#     print("邮件发送失败")