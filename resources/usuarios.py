from flask_restful import Resource, reqparse
from flask import request, jsonify
from models.user import UserModel, RevokedTokenModel
from flask_jwt_extended import (jwt_required, create_access_token, create_refresh_token, jwt_refresh_token_required,
                                get_jwt_identity, get_raw_jwt, set_access_cookies, set_refresh_cookies)
import json

parser = reqparse.RequestParser()
parser.add_argument(
    'username', help='O campo não pode ser branco', required=True)
parser.add_argument(
    'password', help='O campo não pode ser branco', required=True)


class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {'mensagem': 'Usuário {} já existe'. format(data['username'])}

        new_user = UserModel(
            username=data['username'],
            password=UserModel.generate_hash(data['password'])
        )

        try:
            new_user.save_to_db()
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'mensagem': 'Usuário {} foi criado'.format(data['username']),
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        except:
            return {'mensagem': 'Ocorreu um erro interno'}, 500


class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        current_user = UserModel.find_by_username(data['username'])

        if not current_user:
            return {'mensagem': 'User {} doesn\'t exist'.format(data['username'])}, 400

        if UserModel.verify_hash(data['password'], current_user.password):
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])

            resp = jsonify({'mensagem': 'Logado como {}'.format(current_user.username),
                            'access_token': access_token,
                            'refresh_token': refresh_token})
            set_access_cookies(resp, access_token)
            set_refresh_cookies(resp, refresh_token)
            return resp

        else:
            return {'mensagem': 'Credenciais inválidas'}, 400


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'mensagem': 'Token de acesso foi revogado'}
        except:
            return {'mensagem': 'Ocorreu um erro interno'}, 500

class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'mensagem': 'Refresh Token foi revogado'}
        except:
            return {'mensagem': 'Ocorreu um erro interno'}, 500


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        resp = jsonify({'mensagem': 'Logado como {}'.format(current_user),
                'access_token': access_token})
        set_access_cookies(resp, access_token)
        return resp