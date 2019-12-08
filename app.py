from flask import Flask, Request, jsonify, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (JWTManager, create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, set_refresh_cookies, unset_jwt_cookies)
from resources.aplicacoes import Aplicacoes
from resources.produtos import Produtos
from resources.imagens_aplicacoes import ImagensAplicacoes
import resources.usuarios
from flask_cors import CORS
import os
from db import db
from models.user import UserModel, RevokedTokenModel

def create_dir(path):
    try:
        if os.path.isdir(path):
            print ("Diretorio %s ja existe" % path)
            return None
        else:
            os.mkdir(path)
    except OSError:
        print ("Criacao do diretorio %s falhou" % path)
    else:
        print ("Diretorio %s criado com sucesso" % path)

app = Flask(__name__)
api = Api(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '42'
app.config['JWT_SECRET_KEY'] = '42'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

jwt = JWTManager(app)

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)
    
@app.before_first_request
def create_tables():
    create_dir("./static/imagens")
    db.create_all()

#### APLICAÇÕES ####
api.add_resource(Aplicacoes, '/aplicacoes/<int:id>', '/aplicacoes' )
api.add_resource(Produtos, '/produtos/<int:id>', '/produtos', '/produtos/<int:id>/<int:posicao>')
api.add_resource(ImagensAplicacoes, '/imagens_aplicacoes/<int:id>/<int:id_ap>', '/imagens_aplicacoes/<int:id>', '/imagens_aplicacoes' )

api.add_resource(resources.usuarios.UserRegistration, '/registration')
api.add_resource(resources.usuarios.UserLogin, '/login')
api.add_resource(resources.usuarios.UserLogoutAccess, '/logout/access')
api.add_resource(resources.usuarios.UserLogoutRefresh, '/logout/refresh')
api.add_resource(resources.usuarios.TokenRefresh, '/token/refresh')
api.add_resource(resources.usuarios.AllUsers, '/users')
api.add_resource(resources.usuarios.SecretResource, '/secret')

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/admin')
def admin():
   return render_template('adm.html')

@app.route('/admin_produtos')
def admin_produtos():
   return render_template('produtos.html')

@app.route('/admin_aplicacoes')
def admin_aplicacoes():
   return render_template('aplicacoes.html')

@app.route('/adicionar_produto')
def adicionar_produto():
   return render_template('adicionar_produto.html')

@app.route('/editar')
def editar():
   return render_template('editar.html')

@app.route('/editar_produto')
def editar_produto():
   return render_template('editar_produto.html')

@app.route('/login')
def login():
   return render_template('login.html')

db.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)