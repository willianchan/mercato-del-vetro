# Mercato Del Vetro

Projeto para a matéria Linguagens de Programação II - Website da empresa Mercato Del Vetro

Projeto pode ser acessado pelo seguinte endereço: [ec2-52-207-210-38.compute-1.amazonaws.com](ec2-52-207-210-38.compute-1.amazonaws.com)

A área administrativa é acessada por: [ec2-52-207-210-38.compute-1.amazonaws.com/admin](ec2-52-207-210-38.compute-1.amazonaws.com/admin) com as seguintes credenciais:  
Login: admin  
Senha: admin

### Desenvolvedores

* Willian Chan 16.01095-7
* Marcello Scatena Junior 16.01472-3

## Instalação em servidor

### Instalação de dependêcias

```bash
# Comandos baseados em distro CentOS
sudo yum install git

sudo yum install docker

sudo service docker start
```

### Rodando aplicação

```bash
git clone https://github.com/willianchan/mercato-del-vetro.git

cd mercato-del-vetro

sudo docker build -t del-vetro .

sudo docker run --rm -it -d -p 80:80 --name del-vetro del-vetro
```

## Instalação Local

```bash
git clone https://github.com/willianchan/mercato-del-vetro.git

cd mercato-del-vetro

python3 -m virtualenv projeto_env

source .\projeto_env\Scripts\activate

pip3 install -r requirements.txt

python3 app.py
```

## Gulp

```bash
# Limpa a pasta de vendor e copia os frameworks de node_modules para a pasta vendor
gulp vendor
# copia as bibliotecas, minifica e comprime css, js, html e imagens apenas uma vez
gulp build
# Constrói todo o projeto e a partir de qualquer mudança roda tasks do gulp
gulp watch
```

## UX
O site foi desenvolvido como uma Single Page, pois ao visitar diversos sites de vidraçarias foi descoberto que muitas delas têm muitas informações no campo de vista, o que causa uma poluição visual e também dificulta a navegação do usuário na página.

Desse modo, o desenvolvimento foi focado em uma página minimalista em que o usuário consiga chegar em qualquer lugar do site com no máximo 3 cliques e que seja fácil para o mesmo identificar cada seção e seu conteúdo.
### Cores
As cores definidas para a interface foram tons de cinza e amarelo.
O cinza está ligado a neutralidade e estabilidade, causando sentimento de segurança. O amarelo está ligado a descontração, otimismo e alegria. 

A junção dessas cores passou um ar de luxo ao produto, ao mesmo tempo demonstrando confiança com a empresa e o produto. O amarelo aparentemente causou um efeito em que o usuário se sente descontraído, como se a empresa passase um efeito de "familiar".
### Fontes
As fontes utilizadas foram: Montserrat, Droid Serif e Roboto Slab.

Montserrat foi usada para a maioria dos títulos e em itens da navbar, sendo ajustado seu peso em alguns lugares para não causar estranhamento. 

Roboto foi usada em todos os textos de descrição do site.

Droid Serif foi usado junto com Montserrat no texto de introdução do site. Essa combinação causou um efeito diferente ao site, deixando o usuário mais confortável.

## Acompanhamento de horas

### 1º Semestre
* Reuniões: 8 horas
* Ideação: 10 horas
* UX: 4 horas
* Testes e Tutoriais: 20 horas
* Desenvolvimento: 50 horas

### 2º Semestre

Total de horas do grupo: X horas
