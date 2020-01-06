# CHAT BOT

import os
import re
import pymysql
import requests
import json
import dialogflow_v2beta1 as dialogflow
import pytesseract
from app.core_part.get_question import *
from PIL import Image
from flask_bootstrap import Bootstrap
from flask_uploads import configure_uploads, UploadSet
from flask import render_template, request, Flask, flash, redirect, url_for,jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash


# Import environment
def import_env():
    if os.path.exists('app/core_part/.env'):
        print('Importing environment from .env...')
    for line in open('app/core_part/.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            key, value = var[0].strip(), var[1].strip()
            os.environ[key] = value


chatbot = Blueprint('chatbot', __name__)
import_env()

# Define global var id and course id
g_id = 0
g_course = []
g_info = ''

# Get id and course id (student)
@chatbot.route('/upload_id', methods=['POST'])
def get_id_cid():
    L = request.get_data()
    L = json.loads(L)
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
    cursor = db.cursor()
    id = L["id"]
    info = L["info"]
    global g_id
    global g_course
    global g_info
    if info == 's':
        # print('print id:', id)
        cursor.execute("SELECT c_id from Enrolment where s_id=%s", id)
        course = cursor.fetchall()
        g_course = []
        g_id = id
        g_info = info
        if (len(course) == 0):
            return "200"
        g_course.append(''.join(re.findall(r'[A-Za-z0-9]', str(course[0]))))
        g_course.append(''.join(re.findall(r'[A-Za-z0-9]', str(course[1]))))
        g_course.append(''.join(re.findall(r'[A-Za-z0-9]', str(course[2]))))
        print('sget_id_cid:',g_id,g_course,g_info)
        return '200'
    else:
        cursor.execute("SELECT c_id from Teaching where T_id=%s", id)
        course = cursor.fetchall()
        g_course = []
        g_id = id
        g_info = info
        if (len(course) == 0):
            return "200"
        g_course.append(''.join(re.findall(r'[A-Za-z0-9]', str(course[0]))))
        g_course.append(''.join(re.findall(r'[A-Za-z0-9]', str(course[1]))))
        g_course.append(''.join(re.findall(r'[A-Za-z0-9]', str(course[2]))))
        print('tget_id_cid:', g_id, g_course, g_info)
        return '200'



# Get id and course id (teacher)
# @chatbot.route('/upload_id_t', methods=['POST'])
# def get_id_cid_t():
#     L = request.get_data()
#     L = json.loads(L)
#     db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',port=3306, db='chatbot')
#     cursor = db.cursor()
#     id = L["id"]
#     info = L["info"]



# Picture recognition
@chatbot.route('/photo', methods=['POST'])
def get_frame():
    upload_file = request.files['file']
    file_name = upload_file.filename
    
    # Store the image in the cache
    if upload_file:
        curr_paths = os.getcwd() + "/user_cache"
        file_paths = os.path.join(curr_paths, file_name)
        upload_file.save(file_paths)
        
    path_name = "user_cache/" + file_name
    text = ''
    
    # If the image cannot be read, the exception will be skipped.
    try:
        text = pytesseract.image_to_string(Image.open(path_name))
        text = re.sub(r'\n', " ", text)
        text = re.sub(r' +', " ", text)
        return text
    except:
        return text
        

# Main Part
def detect_intent_texts(project_id, session_id, text, language_code):

    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id, session_id)

    if text:
        text_input = dialogflow.types.TextInput(
            text=text, language_code=language_code)
        query_input = dialogflow.types.QueryInput(text=text_input)
        response = session_client.detect_intent(
            session=session, query_input=query_input)

        return response.query_result.fulfillment_text


@chatbot.route('/send_message', methods=['POST'])
def send_message():
    print(g_id,g_course,g_info)
    message = request.form['message']
    project_id = os.getenv('DIALOGFLOW_PROJECT_ID')
    fulfillment_text = detect_intent_texts(project_id, "unique", message, 'en')
    response_text = {"message": fulfillment_text}

    return jsonify(response_text)

# When the user enters a semester parameter, it is recommended to give all courses for this semester.
def which_course_in_this_term(data):
    response = ''
    for i in data['Term123']:
        k = '%'+i+'%'
        response += i+':'+'\n'
        # Connect to the database
        db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin',
                             password='19950423', port=3306, db='chatbot')
        cursor = db.cursor()
        sql = "SELECT course_id,course_title from handbook where offering_terms like %s"
        cursor.execute(sql, k)
        results = cursor.fetchall()
        # Add result
        for m in results:
            response += m[0] + m[1] + '\n'
        db.commit()
        db.close()
    return response

# According to the user's question, query the semester of a course
def this_course_in_which_term(data):
    # Connect to the database
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin',
                         password='19950423', port=3306, db='chatbot')
    sql = "SELECT offering_terms from handbook where  course_id = %s"
    cursor = db.cursor()
    response = ''
    ## Add result
    for i in data['course_id']:# If the user enters multiple courses, use list storage
        print(i)
        cursor.execute(sql, i)
        ((results,),) = cursor.fetchall()
        print(len(results))
        if len(results)==2:
            response += 'Sorry, '+i+' will be not available in next year.'
        else:
            response += i + 'will be offered in :'
            response += results
    return response

# According to the user's question, determine whether a certain course is offered in a certain semester
def is_this_course_in_this_term(data):
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin',
                         password='19950423', port=3306, db='chatbot')
    sql = "SELECT course_id from handbook where  course_id = %s and offering_terms like %s"
    cursor = db.cursor()
    response = ''
    # response += data['course_id'] + 'will be offered in :'
    term='%'+data['Term123']+'%'
    # print(term)
    cursor.execute(sql, (data['course_id'],term))
    results = cursor.fetchall()
    # print(results)
    if len(results)==0:
        response+='Sorry, this course is not available in the this semester.'
    else:
        response += 'Yes, '+data['course_id']+' is  available in '+data['Term123']

    return response

# Search for related courses based on a certain knowledge point
def recommend_by_knowledge(data):
    response = ''
    for i in data['knowledge']:
        k = '%' + i + '%'

        db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin',
                             password='19950423', port=3306, db='chatbot')
        cursor = db.cursor()
        sql = "SELECT course_id,course_title from handbook where course_overview like %s"
        print(k)
        cursor.execute(sql, k)
        results = cursor.fetchall()
        print(results)
        if len(results)==0:
            response += f'No course related {i}'
        else:
            response += i + ':' + '\n'
            for m in results:
                response += m[0] + ': ' + m[1] + '\n'
            print(response)
        db.commit()
        db.close()
    return response

# Search for a course in a specific semester based on a knowledge point
def recommend_by_knowledge_and_term(data):
    response = ''
    term = data['Term123']
    for i in data['knowledge']:
        k = '%' + term + '%'
        response += i + ':' + '\n'
        db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin',
                             password='19950423', port=3306, db='chatbot')
        cursor = db.cursor()
        sql = "SELECT course_id,course_title from handbook where offering_terms like %s and course_overview like %s"
        m = '%' + i + '%'
        cursor.execute(sql, (k, m))
        results = cursor.fetchall()
        for m in results:
            response += m[0] + m[1] + '\n'
        db.commit()
        db.close()
    return response

# Basic information about the course:
# Title:...

def query_course_info(data):
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',
                         port=3306, db='chatbot')
    cursor = db.cursor()
    response = ''
    for i in data['course_id']:
        i=i.upper()
        sql_query= "SELECT course_title FROM handbook where course_id = %s"
        cursor.execute(sql_query, i)
        result = cursor.fetchall()
        db.commit()
        if len(result) == 0:
            response += 'Sorry, there is no course id is '+ i
        else:
            ((result,),) =result
            response += 'Title of '+i+' is '+ result
    db.close()
    return response
# Basic information about the course:
# Title:...
# course_uoc:...
# course_url:...
# school:...
# offering_terms:...
def query_course_all_info(data):
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',
                         port=3306, db='chatbot')
    cursor = db.cursor()
    sql_query = "SELECT course_title,course_uoc,course_url,school,offering_terms FROM handbook where course_id = %s"
    response = ''
    for i in data['course_id']:
        cursor.execute(sql_query, i)
        result = cursor.fetchall()
        if len(result) == 0:
            response += 'Sorry, there is no course id is ' + i
        else:
            (result,) = result
            if result[4] =='{}':
                x='This course is not available in next year.'
            else:
                x=result[4]
            response += i + ' : \n' + ' Title: ' + result[0] + '\ncourse_uoc: ' + result[1] + '\ncourse_url: ' + result[2] + '\nschool: ' + result[3] + '\noffering_terms: ' + x + '\n'
    db.close()
    return response

# Query course staff information
# Term 1 : XXX
# Term 2 : YYY
def query_course_lec(data):
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',
                         port=3306, db='chatbot')

    cursor = db.cursor()
    response = ''
    sql_query = "SELECT stuff_names FROM handbook where course_id = %s"
    course_id = data["course_id"]
    cursor.execute(sql_query, course_id)
    result = cursor.fetchall()
    db.commit()
    if len(result) == 0:
        response += 'Sorry, there is no course in the future '
    else:
        ((result,),) = result
        # print(data["Term123"])
        if data["Term123"]:
            result = json.loads(result)
            term = str(data["Term123"])
            if term in result:
                result = result[term]
            else:
                result = 'Sorry, there is no course in this term '
        else:
            result = result.replace('{','').replace('}','').replace('"',' ')
        response += result
    db.close()
    return response


# Query unanswered question list
# Only employees can view

#Probably the format is as follows
# CourseCOMP9021 has 1 questions to answer.
# Q10: May I know what is the date to submit our Final Report?
#
# CourseCOMP9321 has 1 questions to answer.
# Q11: My timetable indicates that I have a COMP9321 tutorial on Monday. Given Monday is a public holiday, this isn't actually the case, is it? If not, will the Monday tutorials run in Week 11 to make up for missing next week?
#
# CourseCOMP9900 has 2 questions to answer.
# Q4: When is the deadline for Assignment 1?
# Q6: May I know where I can submit the project proposal ?
def show_question(g_course):
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',
                         port=3306, db='chatbot')

    cursor = db.cursor()
    response = ''
    for course in g_course:
        sql_query = "SELECT question_id,question FROM new_question where course_id = %s"
        cursor.execute(sql_query, course)
        result = cursor.fetchall()
        print(result)
        if len(result) != 0:
            response += f'Course{course} has {len(result)} questions to answer.\n'
            for i in result:
                id = 'Q' + str(i[0])
                question = i[1]
                response += id + ': ' + question + '\n'
            response += '\n'
        else:
            response += f'Course{course} has no question to answer now.'
    response += 'If you want to answer the question, please reply to the Qid of the question. \n For example: "Q123"'
    db.close()
    return response

# Employees answer questions
def ans_the_question(data):
    response = ''
    # global question_id
    # if not data["Qid"]:
    #     question_id = ''
    #     return "Wrong type,please try again"
    question_id = data["Qid"]
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',
                         port=3306, db='chatbot')
    cursor = db.cursor()
    sql_query = "SELECT question FROM new_question WHERE question_id=%s"
    cursor.execute(sql_query, question_id[1:])
    result = cursor.fetchall()
    print(result)
    if len(result) !=0:
        ((r,),) = result
        response += f'The question of {question_id} is \n \'{r}\'\n'
        response += 'If you want to add an answer to this question, please reply to the answer to this question.'
    else:
        response += f'There is no questions with id {question_id}.'
    db.commit()
    db.close()
    return response

# Save the questions answered by the teacher to the corresponding database。
def save_the_answer(Qid,answer):
    Qid = Qid.upper()
    response = ''
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',
                         port=3306, db='chatbot')
    cursor = db.cursor()
    sql_query = "SELECT question,course_id FROM new_question WHERE question_id=%s"
    cursor.execute(sql_query, Qid[1:])
    result = cursor.fetchall()
    print(result)
    if len(result) != 0:
        ((question,course_id),) = result
        cursor.execute("DELETE FROM new_question WHERE question_id=%s", Qid[1:])
        cursor.execute("insert into new_answer_new (question, answer, course_id) values (%s, %s, %s)", (question,answer,course_id))
        course_id=course_id.upper()
        course_tmp = course_id + '_question'
        cursor.execute(f"insert into {course_tmp} (questions, answers) values (%s, %s)", (question, answer))
        response += 'Ok,I have saved the answer'
    else:
        response += f'There is no questions with id {Qid}.'
    db.commit()
    db.close()
    return response

# This function is used to let users upload questions.
def upload_the_question(Cid, question):
    response = ''
    db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin', password='19950423',
                         port=3306, db='chatbot')
    cursor = db.cursor()
    cursor.execute("insert into new_question (question,course_id) values (%s,%s)", (question,Cid))
    db.commit()
    # cursor.execute("SELECT question,answer FROM new_answer_new  ORDER BY time desc LIMIT 0,3")
    # result = cursor.fetchall()
    # print('result: ',result)
    db.close()
    response += 'Ok, I have already uploaded your question. \nCourse staff may take 1-2 days to answer your questions, please check it out in a few days.'
    return response
# Connect to dialogflow
@chatbot.route('/get_infomation', methods=['POST'])
def get_infomation():
    print('g_id: ', g_id)
    print('g_course: ', g_course)
    print('g_info: ', g_info)
    data1 = request.get_json(silent=True)
    data = data1['queryResult']['parameters']
    if 'Qid' in data:
        response = ans_the_question(data)
    elif data1['queryResult']['intent']['displayName'] == "upload - fallback":
        Cid = data1['queryResult']['outputContexts'][0]['parameters']['course_id']
        Cid=Cid.upper()
        if Cid not in g_course:
            response = 'Sorry, you don\'t have this course, you can\'t ask questions about this course.'
        else:
            question = data1['queryResult']['queryText']
            response = upload_the_question(Cid, question)
    elif data1['queryResult']['intent']['displayName'] == "ask_question - fallback":
        course_id = data1['queryResult']['outputContexts'][1]['parameters']['CourseID']
        course_id = course_id.upper()
        if course_id not in g_course:
            response = 'Sorry, you don\'t have this course, you can\'t ask questions about this course.'
        else:
            question = data1['queryResult']['queryText']
            print(question)
            questions = get_sim_question(question, course_id)
            response = get_result(questions, course_id)
            print(response)
    elif data1['queryResult']['intent']['displayName'] == "try - followup":
        Qid = data1['queryResult']['outputContexts'][0]['parameters']['Qid']
        print(Qid)
        answer = data1['queryResult']['queryText']
        print(answer)
        response = save_the_answer(Qid,answer)

    elif data1['queryResult']['intent']['displayName'] == "Default Fallback Intent - yes - fallback":
        course_id = data1['queryResult']['outputContexts'][1]['parameters']['CourseID']
        course_id = course_id.upper()
        if course_id not in g_course:
            response = 'Sorry, you don\'t have this course, you can\'t ask questions about this course.'
        else:
            question = data1['queryResult']['queryText']
            print(question)
            questions = get_sim_question(question, course_id)
            response = get_result(questions, course_id)
            print(response)

    elif 'knowledge' in data:
        if len(data['Term123'])==0:
            response=recommend_by_knowledge(data)
        else:
            response = recommend_by_knowledge_and_term(data)
    elif 'Term123' in data:
        if 'course_id' not in data :
            print('data:', data)
            response = which_course_in_this_term(data)
        if 'course_id' in data:
            if 'lecturer' in data:
                # print("1")
                response = query_course_lec(data)
            else:
                response = is_this_course_in_this_term(data)
    elif 'Term' in data:
        if 'course_id' in data and data['Term']=='Term':
            response = this_course_in_which_term(data)

    elif 'course_id' in data:


        if 'name' in data:
            if len(data['name'])!=0:
                response = query_course_info(data)
                if not response:
                    response =  f"Sorry, there is no course id is {data['course_id']}"
            else:
                response = query_course_all_info(data)
                if not response:
                    response = f"Sorry, there is no course id is {data['course_id']}"
        if 'lecturer' in data:
            print(len(data['lecturer']))
            if len(data['lecturer']) != 0:
                response = query_course_lec(data)

    elif data1['queryResult']['intent']['displayName'] == "show_question":
        if g_info == 's':
            response = 'Sorry, only the staff can view the list of questions.'
        else:
            response = show_question(g_course)



    elif data1['queryResult']['intent']['displayName'][0] in ['K', 'k']:
            response = data1['queryResult']['fulfillmentText']
            # response = str(response)[2]
            # response = str(response).split('\n')[2]
            # before_answer = 'This is the teacher\'s answer to similar questions'
            # after_answer = 'If you are satisfied with the answer, if you are not satisfied with the answer, I can help you to check the results of the Internet injury, or upload the question and wait until the teacher answers.'
            # choose1='Internet query reply: \'Internet\''
            # choose2 ='Upload question response: \'Upload question\''
            # response = before_answer+'\n'+response+'\n'+after_answer+'\n'+choose1+'\n'+choose2
            reply = {"fulfillmentText": response, }
            return jsonify(reply)



    else:
        # print(data1['queryResult']['queryText'])
        response = 'Sorry, your question is beyond my knowledge. If you have any questions, please see the help button for more information.'

    reply = {"fulfillmentText": response,}
    return jsonify(reply)




