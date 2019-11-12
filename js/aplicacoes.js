function getProd(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function addAplicacao(aplicacao) {
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="zoom">
        <a class="vidros-link" data-toggle="modal" href="#modalaplicacoes`+ aplicacao.id + `">
            <div class="img-fluid imgSlider" style="background-image: url(`+ aplicacao.imagem + `)">
                <h4 class="texto-produtos">`+ aplicacao.nome + `</h4 class="texto-produtos">
            </div>
        </a>
    </div>
    <div class="text-center"><a href="#expand`+ aplicacao.id + `" data-toggle="collapse" style="color: black; font-size:15px; margin-top:-25px"><i class="fas fa-chevron-down"></i></a></div>

    <div id="expand`+ aplicacao.id + `" class="collapse" style="">
        <div style="margin-top: 10px" class="text-center">
        <div style="margin-bottom: 5px" ><a onClick="editar(`+ aplicacao.id + `,` + `'` + aplicacao.nome + `',` + `'` + aplicacao.imagem + `'` + `)" class="btn btn-primary btn-sm textoBranco" style="cursor: pointer;"><i class="fas fa-edit"></i> Editar</a></div>
        <div><a onClick="deletar(`+ aplicacao.id + `, 'aplicacao')" class="btn btn-primary btn-sm textoBranco" style="cursor: pointer; background-color:#d11a2a !important; border-color:#d11a2a !important"><i class="fas fa-trash-alt"></i> Deletar</a></div>
    </div>
        
    `;

    document.getElementById('getAplicacoes').appendChild(div);
}
function addModal(aplicacao) {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="vidros-modal modal fade" id="modalaplicacoes`+ aplicacao.id + `" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="close-modal" data-dismiss="modal">
            <i class="fas fa-times externo"></i>
        </div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="container small-modal-container">
                    <div class="modal-body">
                        <h2 class="text-uppercase">`+ aplicacao.nome + `</h2>
                        <div class="container">
                            <div class="row justify-content-center">
                                `+ addImagens(aplicacao.id) + `
                            </div>
                        </div>

                        <button class="btn btn-primary" data-dismiss="modal" type="button">
                            <i class="fas fa-times"></i>
                            Fechar</button>
                    </div>

                </div>
            </div>
        </div>
    </div>`
    document.getElementById('getModal').appendChild(div);
}

function addImagem(imagem) {
    return `
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 vidros-item" style="margin-bottom: 10px">
        <a class="open-img fill" data-toggle="modal" href="#imgModal`+ imagem.id + `"><img class="img-produtos img-fluid" src="` + imagem.imagem + `" alt=""></a>
        <div style=" margin-top:-20px"><a href="#expand`+ imagem.id + `" data-toggle="collapse" style="color: black; font-size:15px;"><i class="fas fa-chevron-down"></i></a></div>
        <div id="expand`+ imagem.id + `" class="collapse" style="">
        <div style="margin-top: 10px" class="text-center"><a onClick="deletar(`+ imagem.id + `, 'imagem')" class="btn btn-primary btn-sm textoBranco" style="cursor: pointer; background-color:#d11a2a !important; border-color:#d11a2a !important"><i class="fas fa-trash-alt"></i> Deletar</a></div>
    </div>
    </div>
    
    
    `
        ;
}
function addModalImagem(imagem) {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="vidros-modal img-modal modal fade" id="imgModal`+ imagem.id + `" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="close-modal" data-dismiss="modal">
            <i class="fas fa-times externo"></i>
        </div>
        <div class="modal-dialog">
            <div class="modal-body">
                <div class="row justify-content-center">
                <span class="height-ajust"></span><img class="img-open-modal" src="`+ imagem.imagem + `">
                </div>
            </div>
        </div>
    </div>
    `
    document.getElementById('getModal').appendChild(div);
}

function addImagens(id) {
    var imagens = getProd('http://localhost:5000/imagens_aplicacoes/0/' + id);
    imagens = JSON.parse(imagens);
    console.log(imagens);
    var html = '';
    for (imagem in imagens) {
        console.log(imagens[imagem]);
        html += this.addImagem(imagens[imagem]);
        this.addModalImagem(imagens[imagem]);
    }
    return html;
}

function addAddButton() {
    const div = document.createElement('div');
    div.className = 'col-md-4 col-sm-6 vidros-item';
    div.innerHTML = `
    
    <a class="vidros-link" href="adicionar_produto.html">
        <div class="add-icon">
        <i class="fas fa-folder-plus"></i>
        </div>
    </a>
    <div class="vidros-caption">
        <h4>Adicionar</h4>
    </div>`
    document.getElementById('getAplicacoes').appendChild(div);
}

function editar(idv, titulov, textov, imagemv) {
    document.location.href = `editar_produto.html?id=` + idv + `&titulo=` + titulov + `&texto=` + textov + `&imagem=` + imagemv;
}
function deletar(id, tipo) {
    if (tipo == "imagem") {
        var url = "http://localhost:5000/imagens_aplicacoes/" + id;
        var text = "Após deletada a imagem não poderá ser recuperada. Deseja mesmo deletar?";
        var ok = "Imagem deletada com sucesso!";
    }
    else{ 
        var url = "http://localhost:5000/aplicacoes/" + id;
        var text = "Ao deletar a aplicação todas suas imagens serão deletadas juntas. Deseja mesmo deletar?";
        var ok = "Aplicação deletada com sucesso!";

    }
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    if (confirm(text)) {
        txt = "You pressed OK!";
        xhr.onload = function () {
            var produtos = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(produtos);
                document.location.href = "aplicacoes.html";
                alert(ok)
            } else {
                console.error(produtos);
            }
        }
        xhr.send(null);
    }
}

window.onload = async function () {
    var aplicacoes = getProd('http://localhost:5000/aplicacoes');
    aplicacoes = JSON.parse(aplicacoes);
    console.log(aplicacoes);
    for (aplicacao in aplicacoes) {
        console.log(aplicacoes[aplicacao]);
        this.addAplicacao(aplicacoes[aplicacao]);
        this.addModal(aplicacoes[aplicacao]);
    }
    $('.slider')[0].slick.refresh();
};

