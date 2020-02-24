from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from models.aplicacoes import AplicacoesModel
from models.imagens_aplicacoes import ImagensAplicacoesModel
from werkzeug.utils import secure_filename
import os
from datetime import datetime

from s3 import upload_to_s3, delete_from_s3

UPLOAD_FOLDER = '/static/imagens'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Aplicacoes(Resource):
    @jwt_required
    def post(self):
        nome = request.form['nome']
        posicao = 9999
        if 'files' not in request.files or not nome:
                resp = jsonify({'mensagem' : 'É necessário enviar uma imagem e um nome.'})
                resp.status_code = 400
                return resp

        files = request.files.getlist('files')

        if len(files) != 1:
            resp = jsonify({'mensagem' : 'É necessário enviar apenas uma imagem'})
            resp.status_code = 400
            return resp

        errors = {}
        caminho = ""

        for file in files:		
            if file and allowed_file(file.filename):
                filename = secure_filename(str(datetime.now()).replace(".","_")) + ".jpg"
                caminho = os.getcwd() + UPLOAD_FOLDER + '/' + filename
                while os.path.isfile(caminho):
                    filename = secure_filename(str(datetime.now()).replace(".","_")) + ".jpg"
                    caminho = os.getcwd() + UPLOAD_FOLDER + '/' + filename
                file.save(caminho)
            else:
                errors[file.filename] = 'Tipo do arquivo não permitido'
        
        if errors:
            errors['mensagem'] = 'Algo de errado não está certo'
            resp = jsonify(errors)
            resp.status_code = 500
            return resp

        item = AplicacoesModel(nome = nome, posicao = posicao, imagem = UPLOAD_FOLDER + '/' + filename)

        try:
            item.save()
            upload_to_s3(os.getcwd() + UPLOAD_FOLDER + '/' + filename, 'del-vetro', "imagens/" + filename)
            return {
                'mensagem': 'item criado',
            }, 201
        except:
            return {'mensagem': 'Ocorreu um erro interno'}, 500

    @jwt_required
    def get(self, id=None):
        if id:
            try:
                item = AplicacoesModel.return_by_id(id)
                if item:
                    return item.toDict(), 200
                else:
                    return {'mensagem': 'Item não encontrado'}, 404
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
        else:
                todos = AplicacoesModel.return_all()
                lista_item = []
                for item in todos:
                    lista_item.append(item.toDict())

                #ordena as aplicações pelo valor da posição, a ser melhorado
                for j in range(0,len(lista_item)):
                    for i in range(0,len(lista_item)-1):
                        if lista_item[i]["posicao"]>lista_item[i+1]["posicao"]:
                            Aux = lista_item[i+1]
                            lista_item[i+1] = lista_item[i]
                            lista_item[i] = Aux
                            
                return lista_item, 200

    @jwt_required
    def put(self, id, posicao=None):
        #esse condicional serve apenas para salvar novas posições, nada a ser mexido
        if posicao:
            try:
                item = AplicacoesModel.return_by_id(id)
                item.posicao = posicao
                item.commit()
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
        else:
            try:
                item = AplicacoesModel.return_by_id(id)
                item.nome = request.form['nome']

                files = request.files.getlist('files')

                if len(files) != 0:
                    if len(files) != 1:
                        resp = jsonify({'mensagem' : 'É necessário enviar apenas uma imagem'})
                        resp.status_code = 400
                        return resp

                    errors = {}
                    caminho = ""

                    for file in files:		
                        if file and allowed_file(file.filename):
                            filename = secure_filename(str(datetime.now()).replace(".","_")) + ".jpg"
                            caminho = os.getcwd() + UPLOAD_FOLDER + '/' + filename
                            while os.path.isfile(caminho):
                                filename = secure_filename(str(datetime.now()).replace(".","_")) + ".jpg"
                                caminho = os.getcwd() + UPLOAD_FOLDER + '/' + filename
                            file.save(caminho)
                        else:
                            errors[file.filename] = 'Tipo do arquivo não permitido'
                    
                    if errors:
                        errors['mensagem'] = 'Algo de errado não está certo'
                        resp = jsonify(errors)
                        resp.status_code = 500
                        return resp

                    imagem_old = item.imagem.split("/")[-1]
                    item.imagem = UPLOAD_FOLDER + '/' + filename

                item.commit()
                upload_to_s3(os.getcwd() + UPLOAD_FOLDER + '/' + filename, 'del-vetro', 'imagens/' + filename)
                delete_from_s3('del-vetro', 'imagens/' + imagem_old)
                os.remove(os.path.join(os.getcwd() + UPLOAD_FOLDER, imagem_old))
                return {
                    'mensagem': 'item alterado',
                }, 201
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

    @jwt_required
    def delete(self, id=None):
        if id:
            try:
                item = AplicacoesModel.return_by_id(id)
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

            try:
                if item:
                    aplicacoes = ImagensAplicacoesModel.return_all_by_aplicacao_id(item.id)
                    for aplicacao in aplicacoes:
                        aplicacao.delete()
                        delete_from_s3('del-vetro', 'imagens/' + aplicacao.imagem.split('/')[-1])
                        os.remove(os.getcwd() + aplicacao.imagem)

                    item.delete()
                    delete_from_s3('del-vetro', 'imagens/' + item.imagem.split('/')[-1])
                    os.remove(os.getcwd() + item.imagem)

                    return {'mensagem': 'Item deletado'}, 200
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

            return {'mensagem': 'Item não encontrado'}, 404
        else:
            return {'mensagem': 'Informe um id na requisição'}, 400
