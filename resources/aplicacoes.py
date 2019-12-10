from flask_restful import Resource, reqparse
from flask import request
from models.aplicacoes import AplicacoesModel



class Aplicacoes(Resource):
    def post(self):
        corpo = request.get_json(force=True)
        item = AplicacoesModel(**corpo)

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
                item = AplicacoesModel.return_by_id(id)
                if item:
                    return item.toDict(), 200
                else:
                    return {'mensagem': 'Item não encontrado'}, 404
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500
        else:
            try:
                todos = AplicacoesModel.return_all()
                lista_item = []
                for item in todos:
                    lista_item.append(item.toDict())

                return lista_item, 200
            except:
                return {'mensagem': 'Ocorreu um erro interno'}, 500

    def put(self, id):
        try:
            corpo = request.get_json(force=True)
            item = AplicacoesModel.return_by_id(id)
            item.nome = corpo['nome']
            item.imagem = corpo['imagem']
            item.commit()
            return {
                'mensagem': 'item alterado',
            }, 201
        except:
            return {'mensagem': 'Ocorreu um erro interno'}, 500

    def delete(self, id=None):
        if id:
            try:
                item = AplicacoesModel.return_by_id(id)
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
