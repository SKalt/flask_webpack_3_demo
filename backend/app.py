#! /usr/bin/env python3
import os
from flask import Flask, render_template, Blueprint
from flask_webpack import Webpack


webpack = Webpack()
app = Flask(__name__)
# configure the flask application
dist_path = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), '..',  # the project root
    'frontend', 'dist'
)

app.config['WEBPACK_MANIFEST_PATH'] = os.path.join(dist_path, 'manifest.json')

dist = Blueprint('dist', __name__, static_folder=dist_path)
app.register_blueprint(dist)

@app.route('/')
def hello_world():
    return render_template('index.html')


if __name__ == '__main__':
    webpack.init_app(app)
    try:
        app.run()
    except Exception as e:
        print(e)
        print(app)
