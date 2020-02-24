from db import db
import json
from sqlalchemy import Table, Column, Integer, ForeignKey

class AplicacoesModel(db.Model):
    __tablename__ = 'aplicacoes'

    id = db.Column(db.Integer, primary_key = True)
    nome = db.Column(db.String(50), nullable = False)
    imagem = db.Column(db.String(70), nullable = False)
    posicao = db.Column(db.Integer, nullable=False)
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def commit(self):
        db.session.commit()

    @classmethod
    def return_by_id(cls, id):
        item = cls.query.filter_by(id = id).first()
        return item
    
    @classmethod
    def return_all(cls):
        return cls.query.all()

    def delete(self):
        db.session.delete( self )
        db.session.commit()

    def toDict(self):
        return {'id':self.id, 'nome':self.nome, 'imagem':self.imagem, 'posicao':self.posicao}