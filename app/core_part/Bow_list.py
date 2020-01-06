import sys
import unicodedata
import csv
from collections import Counter
import json
				
def remove_punctuation(text,tbl):
	return text.translate(tbl)


def bow_clean(tbl):
	all_words = []
	with open('5000_questions.csv') as f:
		csv_reader = csv.reader(f)
		for line in csv_reader: 
			sentence_1 = remove_punctuation(line[0],tbl).split(' ')
			sentence_2 = remove_punctuation(line[1],tbl).split(' ')
			all_words = all_words + sentence_1 + sentence_2
	#		print(sentence_2)		
	a = Counter(all_words)
	bow_list = []
	for i in a:
		frequence = a.get('{}'.format(i))
		if frequence > 100:
			bow_list.append(i)
#	print(bow_list)
	return bow_list

if __name__ == '__main__':
	tbl = dict.fromkeys(i for i in range(sys.maxunicode)
						if unicodedata.category(chr(i)).startswith('P'))
	bow_list = bow_clean(tbl)	
	with open('Bow_list.json','w',encoding='utf-8') as f:
		f.write(json.dumps(bow_list, indent=4))
		
