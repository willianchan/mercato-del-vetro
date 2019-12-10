from flask_restful import Resource, reqparse
from flask import request, jsonify
from models.imagens_aplicacoes import ImagensAplicacoesModel
from werkzeug.utils import secure_filename
import os
from datetime import datetime

UPLOAD_FOLDER = '/static/imagens'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class ImagensAplicacoes(Resource):
    def post(self):
        id_ap = request.form['id_ap']
        posicao = 9999
        if 'files' not in request.files:
                resp = jsonify({'mensagem' : 'É necessário enviar uma imagem.'})
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
                filename = secure_filename(str(datetime.now()))
                caminho = os.getcwd() + UPLOAD_FOLDER + '/' + filename
                while os.path.isfile(caminho):
                    filename = secure_filename(str(datetime.now()))
                    caminho = os.getcwd() + UPLOAD_FOLDER + '/' + filename
                file.save(caminho)
            else:
                errors[file.filename] = 'Tipo do arquivo não permitido'
        
        if errors:
            errors['mensagem'] = 'Algo de errado não está certo'
            resp = jsonify(errors)
            resp.status_code = 500
            return resp

        item = ImagensAplicacoesModel(posicao = posicao, imagem = UPLOAD_FOLDER + '/' + filename, aplicacoes_id = id_ap )

        try:
            item.save()
            return {
                'mensagem': 'item criado',
            }, 201
        except:
            return {'mensagem': 'Ocorreu um erro interno'}, 500

    def get(self, id=None, id_ap=None):
        if id_ap:
            try:
                todos = ImagensAplicacoesModel.return_all()
                lista_item = []
                for item in todos:
                    if(item.aplicacoes_id == id_ap):
                        lista_item.append(item.toDict())
                        
                #ordena as aplicações pelo valor da posição, a ser melhorado
                for j in range(0,len(lista_item)):
                    for i in range(0,len(lista_item)-1):
                        if lista_item[i]["posicao"]>lista_item[i+1]["posicao"]:
                            Aux = lista_item[i+1]
                            lista_item[i+1] = lista_item[i]
                            lista_item[i] = Aux
                return lista_item, 200
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
        elif id:
            try:
                item = ImagensAplicacoesModel.return_by_id(id)
                if item:
                    return item.toDict(), 200
                else:
                    return {'mensagem': 'Item não encontrado'}, 404
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
                

        else:
            try:
                todos = ImagensAplicacoesModel.return_all()
                lista_item = []
                for item in todos:
                    lista_item.append(item.toDict())

                return lista_item, 200
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

    def put(self, id, id_ap=None):
        #esse condicional serve apenas para salvar novas posições, nada a ser mexido
        # id_ap deveria ser posição, mas devido a um erro do flask de endereçamento, tive que manter esse nome
        if id_ap:
            try:
                item = ImagensAplicacoesModel.return_by_id(id)
                item.posicao = id_ap
                item.commit()
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
        else:
            try:
                corpo = request.get_json(force=True)
                item = ImagensAplicacoesModel.return_by_id(id)
                item.imagem = corpo['imagem']
                item.commit()
                return {
                    'message': 'item alterado',
                }, 201
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

    def delete(self, id=None):
        if id:
            try:
                item = ImagensAplicacoesModel.return_by_id(id)
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

            try:
                if item:
                    item.delete()
                    return {'mensagem': 'Item deletado'}, 200
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

            return {'mensagem': 'Item não encontrado'}, 404
        else:
            return {'mensagem': 'Informe um id na requisição'}, 400
