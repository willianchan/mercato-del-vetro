function getProd(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function addProduto(produto) {
    const div = document.createElement('div');
    div.className = 'col-md-4 col-sm-6 vidros-item';

    div.innerHTML = `
        <a class="vidros-link" data-toggle="modal" href="#produtoModal`+produto.id+`">
            <div class="vidros-hover">
                <div class="vidros-hover-content">
                    <i class="fas fa-search-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="`+produto.imagem+`" alt="">
        </a>
        <div class="vidros-caption">
            <h4>`+produto.titulo+`</h4>
            <a href="#expand`+produto.id+`" data-toggle="collapse" style="float: right; color: black; font-size:15px; margin-top:-25px"><i class="fas fa-chevron-down"></i></a>

        <div id="expand`+produto.id+`" class="collapse" style="">
            <div style="margin-top: 10px" class="row">
                
                <div class="col-md-6"><a onClick="editar(`+produto.id+`,'`+produto.titulo+`',`+`'`+produto.texto+`',`+`'`+produto.imagem+`'`+`)" class="btn btn-primary btn-sm textoBranco" style="cursor: pointer;"><i class="fas fa-edit"></i> Editar</a></div>
                <div class="col-md-6"><a onClick="deletar(`+produto.id+`)" class="btn btn-primary btn-sm textoBranco" style="cursor: pointer; background-color:#d11a2a !important; border-color:#d11a2a !important"><i class="fas fa-trash-alt"></i> Deletar</a></div>
            </div>
        </div>
        </div>
        
    `;

    document.getElementById('getProdutos').appendChild(div);
}
function addModal(produto) {
    const div = document.createElement('div');
    div.innerHTML =`
    <div class="vidros-modal modal fade" id="produtoModal`+produto.id+`" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="close-modal" data-dismiss="modal">
            <i class="fas fa-times externo"></i>
        </div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="container">
                    <div class="modal-body modal-reduce-width">
                        <h2 class="text-uppercase">`+produto.titulo+`</h2>
                        <img class="img-fluid d-block mx-auto vidros-moldura" src="`+produto.imagem+`" alt="">
                        <p>`+produto.texto+`</p>
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
    document.location.href = `editar_produto.html?id=`+idv+`&titulo=`+titulov+`&texto=`+textov+`&imagem=`+imagemv;
}
function deletar(id){
    var http = new XMLHttpRequest();
    var url = 'http://localhost:5000/produtos/'+id;
    if (true) {
        http.open('DELETE', url, true);
        document.location.href = "produtos.html";
        window.alert("Produto deletado com sucesso!");
    }
    else window.alert("Preencha todos os campos para adicionar o produto");
    http.send(null);
}

window.onload = function() {
    var produtos = getProd('http://localhost:5000/produtos');
    produtos = JSON.parse(produtos);
    console.log(produtos);
    for(produto in produtos){
        console.log(produtos[produto]);
        this.addProduto(produtos[produto]);
        this.addModal(produtos[produto]); 
    }
    this.addAddButton();
  };