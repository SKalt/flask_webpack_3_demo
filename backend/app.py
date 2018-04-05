import os
from flask import Flask, render_template
app = Flask(__name__)
pages = os.path.join('..', 'frontend')
@app.route('/')
def hello_world():
    return render_template(f'{pages}/index.html')
