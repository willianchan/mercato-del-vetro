from flask_restful import Resource, reqparse
from flask import request, jsonify
from models.produtos import ProdutosModel
from werkzeug.utils import secure_filename
import os
from datetime import datetime

UPLOAD_FOLDER = '/static/imagens'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Produtos(Resource):
    def post(self):
        titulo = request.form['titulo']
        texto = request.form['texto']
        posicao=9999
        if 'files' not in request.files or not titulo or not texto:
                resp = jsonify({'mensagem' : 'É necessário enviar uma imagem, um título e um texto.'})
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
                caminho = os.path.join(os.getcwd() + UPLOAD_FOLDER, filename)
                while os.path.isfile(caminho):
                    filename = secure_filename(str(datetime.now()))
                    caminho = os.path.join(os.getcwd() + UPLOAD_FOLDER, filename)
                file.save(caminho)
            else:
                errors[file.filename] = 'Tipo do arquivo não permitido'
        
        if errors:
            errors['mensagem'] = 'Algo de errado não está certo'
            resp = jsonify(errors)
            resp.status_code = 500
            return resp

        item = ProdutosModel(titulo = titulo, texto = texto, imagem = os.path.join(UPLOAD_FOLDER, filename), posicao = posicao)

        try:
            item.save()
            return {
                'mensagem': 'item criado',
            }, 201
        except:
            return {'mensagem': 'Ocorreu um erro interno'}, 500

    def get(self, id=None):
        if id:
            try:
                item = ProdutosModel.return_by_id(id)
                if item:
                    return item.toDict(), 200
                else:
                    return {'mensagem': 'Item não encontrado'}, 404
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
        else:
                todos = ProdutosModel.return_all()
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

    def put(self, id, posicao=None):
        #esse condicional serve apenas para salvar novas posições, nada a ser mexido
        if posicao:
            try:
                item = ProdutosModel.return_by_id(id)
                item.posicao = posicao
                item.commit()
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
        else:
            try:
                item = ProdutosModel.return_by_id(id)
                item.titulo = request.form['titulo']
                item.texto = request.form['texto']

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
                            filename = secure_filename(str(datetime.now()))
                            caminho = os.path.join(os.getcwd() + UPLOAD_FOLDER, filename)
                            while os.path.isfile(caminho):
                                filename = secure_filename(str(datetime.now()))
                                caminho = os.path.join(os.getcwd() + UPLOAD_FOLDER, filename)
                            file.save(caminho)
                        else:
                            errors[file.filename] = 'Tipo do arquivo não permitido'
                    
                    if errors:
                        errors['mensagem'] = 'Algo de errado não está certo'
                        resp = jsonify(errors)
                        resp.status_code = 500
                        return resp


                    item.imagem = os.path.join(UPLOAD_FOLDER, filename)
                item.commit()
                return {
                    'mensagem': 'item alterado',
                }, 201
            except:
                print("deu ruim")
                return {'mensagem': 'Ocorreu um erro interno'}, 500

        


    def delete(self, id=None):
        if id:
            try:
                item = ProdutosModel.return_by_id(id)
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
