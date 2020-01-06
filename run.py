from app import app
from app.core_part.chatbot import chatbot
from flask import Flask, render_template
import os

app.register_blueprint(chatbot)

if __name__ == '__main__':
    app.run(debug=True)