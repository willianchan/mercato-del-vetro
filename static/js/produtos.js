//envia os parâmetros de um produto para a tela de edição pela url
function editar(idv, titulov, textov, imagemv) {
    document.location.href = "editar_produto?id=" + idv + "&titulo=" + titulov + "&texto=" + textov + "&imagem=" + imagemv;
}

//deleta produtos
function deletar(id) {
    var url = "produtos/" + id;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    if (confirm("Após deletado o produto não poderá ser recuperado. Deseja mesmo deletar?")) {
        xhr.onload = function () {
            var produtos = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(produtos);
                document.location.href = "admin_produtos";
            } else {
                console.error(produtos);
            }
        }
        xhr.send(null);
    }

}

//incicializa o JQuery-ui sortable desabilitado
$(function () {
    $("#getProdutos").sortable({
        disabled: true
    });

    $("#getProdutos").disableSelection();
});

//habilita o JQuery-ui sortable
function movimentar() {
    const div = document.createElement('div');
    div.id = "addBotao";
    div.innerHTML = '<a class="btn btn-primary btn-md botao-oco" style="margin-right: 10px;" href="admin_produtos">Cancelar</a> <a class="btn btn-primary btn-md textoBranco" style="cursor: pointer; background-color: #32CD32 !important; border-color: #32CD32 !important" onClick="salvar()"><i class="fas fa-check-circle"></i> Salvar</a>'
    document.getElementById("addBotao").remove();
    document.getElementById("botoes").appendChild(div);
    $("#getProdutos").sortable("option", "disabled", false);
}

//salva a nova ordem dos produtos
function salvar() {
    var sorted = $("#getProdutos").sortable("toArray");
    for (var i = 0; i < sorted.length; i++) editarPosicao(sorted[i], i + 1);
    const div = document.createElement('div');
    div.id = "addBotao";
    div.innerHTML = '<a onClick="movimentar()" class="btn btn-primary btn-md textoBranco" style="margin-right: 10px;"><i class="fas fa-arrows-alt"></i>Movimentar</a> <a class="btn btn-primary btn-md textoBranco" href="adicionar_produto"><i class="fas fa-plus-circle"></i> Adicionar</a>'
    document.getElementById("addBotao").remove();
    document.getElementById("botoes").appendChild(div);
    $("#getProdutos").sortable({
        disabled: true
    });

    $("#getProdutos").disableSelection();

}

//registra a nova posição de cada aplicação
function editarPosicao(id, posicao) {
    var http = new XMLHttpRequest();
    url = '/produtos/' + id + '/' + posicao;
    http.open('PUT', url, true);
    http.send();
}

