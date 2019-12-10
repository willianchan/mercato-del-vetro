function getProd(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function addProduto(produto) {
    div = document.createElement('div');
    div.className = 'col-md-4 col-sm-6 vidros-item';
    div.id = `produtoModal_`+ produto.id

    div.innerHTML = `
        <a class="vidros-link" data-toggle="modal" href="#produtoModal`+ produto.id + `">
            <div class="vidros-hover">
                <div class="vidros-hover-content">
                    <i class="fas fa-search-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid fit-image" src="`+ produto.imagem + `" alt="">
        </a>
        <div class="vidros-caption">
            <h4>`+ produto.titulo + `</h4>
            <a href="#expand`+ produto.id + `" data-toggle="collapse" style="color: black; font-size:15px; margin-top:-25px"><i class="fas fa-chevron-down"></i></a>

            <div id="expand`+ produto.id + `" class="collapse" style="">
                <div style="margin-top: 10px" class="row">
                <div class="col-md-6"><a onClick="editar(`+ produto.id + `,'` + produto.titulo + `',` + `'` + produto.texto + `',` + `'` + produto.imagem + `'` + `)" class="btn btn-primary btn-sm textoBranco" style="cursor: pointer;"><i class="fas fa-edit"></i> Editar</a></div>
                <div class="col-md-6"><a onClick="deletar(`+ produto.id + `)" class="btn btn-primary btn-sm textoBranco" style="cursor: pointer; background-color:#d11a2a !important; border-color:#d11a2a !important"><i class="fas fa-trash-alt"></i> Deletar</a></div>
            </div>
        </div>
        </div>
        
    `;

    document.getElementById('getProdutos').appendChild(div);
}
function addModal(produto) {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="vidros-modal modal fade" id="produtoModal`+ produto.id + `" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="close-modal" data-dismiss="modal">
            <i class="fas fa-times externo"></i>
        </div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="container">
                    <div class="modal-body modal-reduce-width">
                        <h2 class="text-uppercase">`+ produto.titulo + `</h2>
                        <img class="img-fluid d-block mx-auto vidros-moldura" src="`+ produto.imagem + `" alt="">
                        <p>`+ produto.texto + `</p>
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
    document.getElementById('getProdutos').appendChild(div);
}

function editar(idv, titulov, textov, imagemv) {
    document.location.href = `editar_produto?id=` + idv + `&titulo=` + titulov + `&texto=` + textov + `&imagem=` + imagemv;
}
function deletar(id) {
    var url = "produtos/" + id;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    if (confirm("Após deletado o produto não poderá ser recuperado. Deseja mesmo deletar?")) {
        txt = "You pressed OK!";
        xhr.onload = function () {
            var produtos = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(produtos);
                document.location.href = "admin_produtos";
                alert("Produto deletado com sucesso!")
            } else {
                console.error(produtos);
            }
        }
        xhr.send(null);
    }
    
}
function movimentar() {
    console.log(this.mov);
    const div = document.createElement('div');
    div.id = "addBotao";
    div.innerHTML = `
    <a class="btn btn-primary btn-md botao-oco" style="margin-right: 10px;" href="produtos.html">
        Cancelar</a>
    <a class="btn btn-primary btn-md textoBranco" style="background-color: #32CD32 !important; border-color: #32CD32" href="adicionar_produto.html"><i class="fas fa-check-circle"></i> Salvar</a>
    `
    document.getElementById("addBotao").remove();
    document.getElementById("botoes").appendChild(div);
}
window.onload = function () {
    var produtos = getProd('http://localhost/produtos');
    produtos = JSON.parse(produtos);
    console.log(produtos);
    for (produto in produtos) {
        console.log(produtos[produto]);
        this.addProduto(produtos[produto]);
        this.addModal(produtos[produto]);
    }
    //this.addAddButton();
};