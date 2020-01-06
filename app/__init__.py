# Inital 

import pymysql
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import render_template
from flask_bootstrap import Bootstrap
# from config import Config

app = Flask(__name__)
bootstrap = Bootstrap(app)
# app.config.from_object(Config)
db = pymysql.connect(host ='database-1.clr3d8nnckz4.us-east-2.rds.amazonaws.com',user = 'admin',password='19950423',port=3306,db='chatbot')
# db = SQLAlchemy(app)
migrate = Migrate(app, db)

from .inital_part import routes
#import models