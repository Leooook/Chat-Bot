# -*- coding: utf-8 -*-
import unicodedata
import numpy as np
import re
import csv
import time
import sys
import json
import pymysql


def remove_punctuation(text,tbl):
#	print(text.translate(tbl))
	return text.translate(tbl)
	
	
def get_word_vector(s1,s2,tbl):
	"""
	param s1: sentence 1
	param s2: sentence 2
	return: return the similarity of these two sentences
	"""
	list_word1 = remove_punctuation(s1,tbl).split(' ')
	list_word2 = remove_punctuation(s2,tbl).split(' ')

	key_word = list(set(list_word1 + list_word2))
	word_vector1 = np.zeros(len(key_word))
	word_vector2 = np.zeros(len(key_word))
	for i in range(len(key_word)):
	# The number of occurrences of each word in the sentence
		for j in range(len(list_word1)):
			if key_word[i] == list_word1[j]:
				word_vector1[i] += 1
		for k in range(len(list_word2)):
			if key_word[i] == list_word2[k]:
				word_vector2[i] += 1
	return word_vector1, word_vector2
def cos_dist(vec1,vec2):
	"""
	return: Returns the cosine similarity of two vectors
	"""
	dist1=float(np.dot(vec1,vec2)/(np.linalg.norm(vec1)*np.linalg.norm(vec2)))
#	print(dist1)
	return dist1
#################################################################################################	
#需要的part 获取选取课程的问题 根据用户输入返回top3的相似问题
def get_sim_question(user_input,course_id):
	top_3_list = []
	question_list = []
	db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin',
	                             password='19950423', port=3306, db='chatbot')
	cursor = db.cursor()
	sql = f'SELECT Questions From {course_id}_question'
	cursor.execute(sql)
	result = cursor.fetchall()
	db.commit()
	for i in result:
#		print(i[0])
		question_list.append(i[0])
#	print(question_list)
	f = open("app/core_part/Bow_list.json", encoding='utf-8')
	bow_list = json.load(f)
	tbl = dict.fromkeys(i for i in range(sys.maxunicode)
							if unicodedata.category(chr(i)).startswith('P'))

	sentence1 = user_input
	sentence1 = sentence1.split(' ')
	new_sentence = ''
	for word in sentence1 :
		if not word in bow_list:
			new_sentence = new_sentence + ' ' + word
				
	start_time = time.time()
	similarity = []
	'''
	Traverse the entire database and calculate the similarity between the input and each sentence
	'''
	for i in range(len(question_list)):
		vec1,vec2=get_word_vector(new_sentence,question_list[i],tbl)
		dist1 = cos_dist(vec1,vec2)
		similarity.append(dist1)
	'''
	get the Top3 answers  
	'''	
	for j in range(3):
		print(max(similarity))
		if max(similarity) < 0.4:
			return top_3_list
		max_index = similarity.index(max(similarity))
#		print(max(similarity))
		top_3_list.append(question_list[max_index])
		similarity[max_index] = 0
	return top_3_list


# 根据选取的top3问题分别获取答案
def get_result(question_list,course_id):
	response = ''
	if not question_list:
		response += 'Sorry, your question is beyond my knowledge. \nI can help you to upload the question and wait until the teacher answers.\n\n Upload question response: \'Upload question to COURSE ID\' \nFor example：Upload question to COMP9900'
	else:
		db = pymysql.connect(host='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com', user='admin',
							 password='19950423', port=3306, db='chatbot')
		cursor = db.cursor()
		if len(question_list) == 1:
			response += 'This is the problem I found closest to your problem.\n'
		else:
			response += 'Those are the problems I found closest to your problem.\n'
		for i in question_list:
			sql = f'SELECT Answers From {course_id}_question where Questions = %s'
			cursor.execute(sql, i)
			result = cursor.fetchall()
			result = result[0][0]
			db.commit()
			response += f'Question:\n \"{i}\"\n Answer:\n\"{result}\"\n'
		response+='Are you satisfied with this answer?'
		db.close()
	return response
# quesiton_list = get_sim_question('I wanna know if there are solutions for assignment_1 would be put on Ed or somewhere else?', 'COMP9021')
# print(quesiton_list)
# 
# 
# print(get_result(quesiton_list,'COMP9021'))

#sample output
'''
Answer of "Does the portion for final exam include lab 1-6 or just labs 7-12, other than the sample questions given?" 
is
"Everything"
Answer of "There seems to be a problem with the output of the auto-test program for assignment 2.

I checked my problem. I am sure that when I entered (for example)

frieze = Frieze('frieze_5.txt')
	frieze.analyse()
	frieze.display()

the filename of the .tex file it generated was indeed 'frieze_5.tex', not 'frieze_1.tex'.

So there might be some problem with the auto-test program." 
is
"you are right, I copied and pasted without editing enough... Thanks for pointing this out. Now I have the issue that I exceed the max limit for json output on Ed, this will be sorted in one way or another tomorrow or on Monday. Thanks. "
Answer of "why round£¨2.5£©= 2 £¿ I think it should be 3      T^T" 
is
"It rounds to the even one. Of course it is arbitrary."
'''