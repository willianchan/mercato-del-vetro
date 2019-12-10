from flask import Flask, Request, jsonify, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from resources.aplicacoes import Aplicacoes
from resources.produtos import Produtos
from resources.imagens_aplicacoes import ImagensAplicacoes
from resources.usuarios import UserRegistration, UserLogin, UserLogoutAccess, UserLogoutRefresh, TokenRefresh
from flask_cors import CORS
import os
from db import db
from models.user import UserModel, RevokedTokenModel


def create_dir(path):
    try:
        if os.path.isdir(path):
            print("Diretorio %s ja existe" % path)
            return None
        else:
            os.mkdir(path)
    except OSError:
        print("Criacao do diretorio %s falhou" % path)
    else:
        print("Diretorio %s criado com sucesso" % path)


app = Flask(__name__)
api = Api(app)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


app.config['JWT_TOKEN_LOCATION'] = ['cookies']

app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False

cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '42'
app.config['JWT_SECRET_KEY'] = '42'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

jwt = JWTManager(app)


@jwt.unauthorized_loader
def unauthorized_response(callback):
    return render_template('login_required.html')


@jwt.expired_token_loader
def expired_token_response(callback):
    return render_template('login_required.html')


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)


@app.before_first_request
def create_tables():
    create_dir("./static/imagens")
    db.create_all()


#### ROTAS API ####
api.add_resource(Aplicacoes, '/aplicacoes/<int:id>',
                    '/aplicacoes', '/aplicacoes/<int:id>/<int:posicao>')
api.add_resource(Produtos, '/produtos/<int:id>', '/produtos',
                    '/produtos/<int:id>/<int:posicao>')
api.add_resource(ImagensAplicacoes, '/imagens_aplicacoes/<int:id>/<int:id_ap>',
                    '/imagens_aplicacoes/<int:id>', '/imagens_aplicacoes')
####################

##### ROTAS AUTENTICAÇÃO #####
api.add_resource(UserRegistration, '/registration')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogoutAccess, '/logout/access')
api.add_resource(UserLogoutRefresh, '/logout/refresh')
api.add_resource(TokenRefresh, '/token/refresh')
##############################

##### ROTAS FRONT #####
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/admin')
def login():
    return render_template('login.html')


@app.route('/administracao')
@jwt_required
def admin():
    return render_template('adm.html')


@app.route('/admin_produtos')
@jwt_required
def admin_produtos():
    return render_template('produtos.html')


@app.route('/adicionar_produto')
@jwt_required
def adicionar_produto():
    return render_template('adicionar_produto.html')


@app.route('/editar_produto')
@jwt_required
def editar_produto():
    return render_template('editar_produto.html')


@app.route('/admin_aplicacoes')
@jwt_required
def admin_aplicacoes():
    return render_template('aplicacoes.html')


@app.route('/adicionar_aplicacao')
@jwt_required
def adicionar_aplicacao():
    return render_template('adicionar_aplicacao.html')


@app.route('/editar_aplicacao')
@jwt_required
def editar_aplicacao():
    return render_template('editar_aplicacao.html')


@app.route('/adicionar_imagem_aplicacao')
@jwt_required
def adicionar_imagem_aplicacao():
    return render_template('adicionar_imagem_aplicacao.html')
##########################


db.init_app(app)

if __name__ == "__main__":
    app.run(port=80, host='0.0.0.0', debug=True)
