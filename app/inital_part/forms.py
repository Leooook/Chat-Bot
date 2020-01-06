# forms

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, PasswordField, SelectField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError, Regexp

class RegisterForm(FlaskForm):
	id = StringField('zID', validators=[DataRequired(),Regexp(r'z[0-9][0-9][0-9][0-9][0-9][0-9][0-9]',message = "ID is invalid")], render_kw={"placeholder": "Please enter your zID"})
	name = StringField('Name', validators=[DataRequired()], render_kw={"placeholder": "Please enter your zID"})
	email = StringField('Email', validators=[DataRequired(), Length(4, 64)], render_kw={"placeholder": "you@example.com"}) 
	password = PasswordField('Password', validators=[DataRequired(),Length(8,16)], render_kw={"placeholder": "Must with 8 to 16 characters long"})
	SorT = SelectField('Student or Staff', validators=[DataRequired()],render_kw={'class': 'form-control'},choices=[(1, 'Student'), (2, 'Staff')],default = 1,coerce = int)
	submit = SubmitField('submit')
	
class LoginForm(FlaskForm):
    id = StringField('', validators=[DataRequired(),Regexp(r'z[0-9][0-9][0-9][0-9][0-9][0-9][0-9]',message = "ID is invalid")], render_kw={"placeholder": "zID"})
    password = PasswordField('', validators=[DataRequired(),Length(8,16)], render_kw={"placeholder": "Password"})
    SorT = SelectField('', validators=[DataRequired()],render_kw={'class': 'form-control'},choices=[(1, 'Student'), (2, 'Staff')],default = 1,coerce = int)
    submit = SubmitField('submit')
    
    