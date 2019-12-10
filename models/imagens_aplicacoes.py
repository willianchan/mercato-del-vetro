from db import db
import json
from sqlalchemy import Table, Column, Integer, ForeignKey

class ImagensAplicacoesModel(db.Model):
    __tablename__ = 'imagens_aplicacoes'
    id = db.Column(db.Integer, primary_key=True)
    imagem = db.Column(db.String(120), nullable=False)
    aplicacoes_id = db.Column(db.Integer, db.ForeignKey('aplicacoes.id'), nullable=False)
    posicao = db.Column(db.Integer)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def commit(self):
        db.session.commit()

    @classmethod
    def return_by_id(cls, id):
        item = cls.query.filter_by(id=id).first()
        return item

    @classmethod
    def return_all(cls):
        return cls.query.all()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def toDict(self):
        return {'id': self.id, 'imagem': self.imagem, 'aplicacoes_id': self.aplicacoes_id, 'posicao':self.posicao}
