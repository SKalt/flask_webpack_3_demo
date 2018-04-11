import os
from flask import Flask, render_template
from flask_webpack import Webpack


webpack = Webpack()
app = Flask(__name__)
# configure the flask application
app.config['WEBPACK_MANIFEST_PATH'] = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), '..',  # the project root
    'frontend', 'dist', 'manifest.json'
)
# pages = os.path.join(dir_path, '..', 'frontend')
@app.route('/')
def hello_world():
    return render_template('index.html')


if __name__ == '__main__':
    webpack.init_app(app)
    app.run()
