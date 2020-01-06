# Register and login

import json
import re
import pymysql
from app import app,db
from flask import render_template,request,Flask, flash,redirect,url_for,jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bootstrap import Bootstrap
from .forms import RegisterForm,LoginForm


app.config["SECRET_KEY"] = "12345678"


#    def validate_username(self, id):
#        user = S1.query.filter_by(User_id=id.data).first()
#        if user:
#            raise ValidationError("id已存在。")
#
#    def validate_email(self, email):
#        user = S1.query.filter_by(User_email=email.data).first()
#        if user:
#            raise ValidationError('email已存在.')

# Login 
@app.route('/',methods=["POST", "GET"])
def login():
    form = LoginForm()
    if request.method == 'GET':
        return render_template("base.html",title = 'login', form = form)
    else:
        db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
        cursor = db.cursor()
        sql= ["SELECT password,name,email from student where id=%s","SELECT password,name,email from staff where id=%s"]
        if form.validate_on_submit():
            id = form.id.data
            print(id)
            password = form.password.data
            SorT = form.SorT.data
            if SorT == 1:
                cursor.execute(sql[0],id)
                result = cursor.fetchall()
                if len(result) != 0:
                    ((results,user,email),) = result
                    print(results)
                    print(password)
                    if check_password_hash(results,password):
                        db.commit()
                        db.close()
                        info = [id, user, email,'s']
                        print(info)
                        return render_template("index_student.html", info = info) 
                 
            else:
                cursor.execute(sql[1],id)
                result = cursor.fetchall()
                if len(result) != 0:
                    ((results,user,email),) = result
                    print(results)
                    print(password)
                    if check_password_hash(results,password):
                        db.commit()
                        db.close()
                        info = [id, user, email,'t']
                        print(info)
                        return render_template("index_teacher.html", info = info)  
        else:
            print('******')
        db.rollback()
        db.close()
        flash(u'Sorry, your account or password was incorrect. Please double-check.','error')
        return redirect(url_for('login'))

# Register
@app.route('/register',methods=["POST", "GET"])
def sign_in():
    form = RegisterForm()
    if request.method == 'GET':
        return render_template("register.html",title = 'register', form = form)
    else:
        db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
        cursor = db.cursor()
        sql= ["INSERT INTO student(id,email,password,name) VALUES (%s,%s,%s,%s)","INSERT INTO staff(id,email,password,name) VALUES (%s,%s,%s,%s)"]
        if form.validate_on_submit():
            id = form.id.data
            name = form.name.data
            email = form.email.data
            password = form.password.data
            SorT= form.SorT.data
            password= generate_password_hash(password)
            if SorT == 1:
                cursor.execute("SELECT * from student where id=%s", id)
                result = cursor.fetchall()
                if len(result) != 0:
                    flash('Registration failed, zID has been registered, please log in directly.', 'error')
                    return render_template("register.html", title='register', form=form)
                else:
                    cursor.execute(sql[0],(id,email,password,name))
            else:
                cursor.execute("SELECT * from staff where id=%s", id)
                result = cursor.fetchall()
                if len(result) != 0:
                    flash('Registration failed, zID has been registered, please log in directly.', 'error')
                    return render_template("register.html", title='register', form=form)
                else:
                    cursor.execute(sql[1],(id,email,password,name))
            db.commit()
            db.close()
            # flash('Congratulations, your register are success.', 'info')
            return redirect(url_for('login'))      
        db.rollback()
        db.close()
        flash('Sorry, your register not success, please try again.', 'error')
        return render_template("register.html",title = 'register', form = form)
    
# Get Info (Student)
@app.route('/info',methods=["POST"])
def get_info():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT name,email from student where id=%s "
    id = L['id']
    cursor.execute(sql,id)
    ((user,email),) = cursor.fetchall()
    infos = {"name":user, "email":email}
    return json.dumps(infos)

# Get Info (Teacher)
@app.route('/info_t',methods=["POST"])
def get_info_t():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT name,email from staff where id=%s "
    id = L['id']
    cursor.execute(sql,id)
    ((user,email),) = cursor.fetchall()
    infos = {"name":user, "email":email}
    return json.dumps(infos)
    
# New name (Student)
@app.route('/name',methods=["POST"])
def new_name():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT name from student where id=%s"
    id = L['id']
    name = L['name']
    cursor.execute(sql,id)
    sql = "UPDATE student set name=%s WHERE id = %s "
    cursor.execute(sql,(name,id))
    db.commit()
    db.close()
    return '200'

# New name (Teacher)
@app.route('/name_t',methods=["POST"])
def new_name_t():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT name from staff where id=%s"
    id = L['id']
    name = L['name']
    cursor.execute(sql,id)
    sql = "UPDATE staff set name=%s WHERE id = %s "
    cursor.execute(sql,(name,id))
    db.commit()
    db.close()
    return '200'
 
# New email (Student)
@app.route('/email',methods=["POST"])
def new_email():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT email from student where id=%s"
    id = L['id']
    email = L['email']
    cursor.execute(sql,id)
    sql = "UPDATE student set email=%s WHERE id = %s "
    cursor.execute(sql,(email,id))
    db.commit()
    db.close()
    return '200'

# New email (Teacher)
@app.route('/email_t',methods=["POST"])
def new_email_t():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT email from staff where id=%s"
    id = L['id']
    email = L['email']
    cursor.execute(sql,id)
    sql = "UPDATE staff set email=%s WHERE id = %s "
    cursor.execute(sql,(email,id))
    db.commit()
    db.close()
    return '200'

# New Password (Student)
@app.route('/password',methods=["POST"])
def new_password():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT password from student where id=%s"
    id = L['id']
    password = L['old_passwd']
    new_password = L['new_passwd']
    cursor.execute(sql,id)
    ((results,),) = cursor.fetchall()
    if check_password_hash(results,password):
        new_password = generate_password_hash(new_password)
        sql = "UPDATE student set password=%s WHERE id = %s "
        cursor.execute(sql,(new_password,id))
        db.commit()
        db.close()
        return '200'
    else:
        return '300'
    
# New Password (Teacher)
@app.route('/password_t',methods=["POST"])
def new_password_t():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
    cursor = db.cursor()
    sql= "SELECT password from staff where id=%s"
    id = L['id']
    password = L['old_passwd']
    new_password = L['new_passwd']
    cursor.execute(sql,id)
    ((results,),) = cursor.fetchall()
    if check_password_hash(results,password):
        new_password = generate_password_hash(new_password)
        sql = "UPDATE staff set password=%s WHERE id = %s "
        cursor.execute(sql,(new_password,id))
        db.commit()
        db.close()
        return '200'
    else:
        return '300'

# My Class (Student)
@app.route('/classes',methods=["POST"])    
def classes():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
    cursor = db.cursor()
    id = L["id"]
    cursor.execute("SELECT c_id from Enrolment where s_id=%s",id)
    result = cursor.fetchall()
    print(result)
    if len(result) == 3:
        classes = {"c0":result[0], "c1":result[1], "c2":result[2]}
        return json.dumps(classes)
    db.commit()
    db.close()
    return "404"

# Upload my Class (Student)
@app.route('/up_course',methods=["POST"]) 
def up_course():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
    cursor = db.cursor()
    id = L["id"]
    cursor.execute("INSERT INTO Enrolment(s_id,c_id) VALUES (%s,%s)",(id,str.upper(L["course1"])))
    cursor.execute("INSERT INTO Enrolment(s_id,c_id) VALUES (%s,%s)",(id,str.upper(L["course2"])))
    cursor.execute("INSERT INTO Enrolment(s_id,c_id) VALUES (%s,%s)",(id,str.upper(L["course3"])))
    db.commit()
    db.close()
    return "200"

# My Class (Teacher)
@app.route('/classes_t',methods=["POST"])    
def classes_t():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
    cursor = db.cursor()
    id = L["id"]
    cursor.execute("SELECT c_id from Teaching where T_id=%s",id)
    result = cursor.fetchall()
    print(result)
    if len(result) == 3:
        classes = {"c0":result[0], "c1":result[1], "c2":result[2]}
        return json.dumps(classes)
    db.commit()
    db.close()
    return "404"

# Upload my Class (Teacher)
@app.route('/up_course_t',methods=["POST"]) 
def up_course_t():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
    cursor = db.cursor()
    id = L["id"]
    cursor.execute("INSERT INTO Teaching (T_id,c_id) VALUES (%s,%s)",(id,str.upper(L["course1"])))
    cursor.execute("INSERT INTO Teaching (T_id,c_id) VALUES (%s,%s)",(id,str.upper(L["course2"])))
    cursor.execute("INSERT INTO Teaching (T_id,c_id) VALUES (%s,%s)",(id,str.upper(L["course3"])))
    db.commit()
    db.close()
    return "200"


# Questions
@app.route('/questions',methods=["POST"])    
def questions():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
    cursor = db.cursor()
    id = L["id"]
    cursor.execute("SELECT c_id from Enrolment where s_id=%s",id)
    course = cursor.fetchall()
    print(course)
    
    if len(course) != 3:
        return '404'
    
    questions = []
    for i in course:
        cursor.execute("SELECT question,answer FROM new_answer_new  where course_id = %s ORDER BY time desc LIMIT 0,3",i)
        result = cursor.fetchall()
        questions.append([])
        for j in range(len(result)):
            questions[-1].append(result[j][0])
            questions[-1].append(result[j][1])
    print(questions)
    
    qst = {"c1":course[0], "question11":questions[0][0], "answer11":questions[0][1],"question12":questions[0][2], "answer12":questions[0][3],"question13":questions[0][4], "answer13":questions[0][5],"c2":course[1], "question21":questions[1][0], "answer21":questions[1][1],"question22":questions[1][2], "answer22":questions[1][3],"question23":questions[1][4], "answer23":questions[1][5],"c3":course[2], "question31":questions[2][0], "answer31":questions[2][1],"question32":questions[2][2], "answer32":questions[2][3],"question33":questions[2][4], "answer33":questions[2][5]}
    print(qst)
    qst = json.dumps(qst)
    db.close()
    return qst
    
# Satistics for teacher
@app.route('/satistics',methods=["POST"])
def satistics():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
    cursor = db.cursor()
    id = L["id"]
    cursor.execute("SELECT c_id from Teaching where T_id=%s",id)
    course = cursor.fetchall()
    print(course)
    
    if len(course) != 3:
        return '404'
    
    sat = []
    for i in course:
        cursor.execute("SELECT COUNT(question) FROM new_answer_new  where course_id = %s ",i)
        result = cursor.fetchall()
        sat.append(int(re.findall(r"\d+",str(result[0]))[0]))
        cursor.execute("SELECT COUNT(question) FROM new_question  where course_id = %s ",i)
        result = cursor.fetchall()
        sat.append(int(re.findall(r"\d+",str(result[0]))[0]))
    
    print(sat)
    s1 = int((sat[0]/(sat[0] + sat[1]))*100)
    s2 = int((sat[2]/(sat[2] + sat[3]))*100)
    s3 = int((sat[4]/(sat[4] + sat[5]))*100)
    satistics = {"c1":course[0], "q1":sat[0], "qq1":sat[1], "s1":s1, "c2":course[1], "q2":sat[2], "qq2":sat[3], "s2":s2, "c3":course[2], "q3":sat[4], "qq3":sat[5], "s3":s3, }
    print(satistics)
    satistics = json.dumps(satistics)
    db.close()
    return satistics
