//envia os parâmetros de uma aplicação para a tela de edição pela url
function editar(idv, nomev, imagemv) {
    document.location.href = `editar_aplicacao?id=` + idv + `&nome=` + nomev + `&imagem=` + imagemv;
}

//deleta aplicações e imagens
function deletar(id, tipo) {
    if (tipo == "imagem") {
        var url = "/imagens_aplicacoes/" + id;
        var text = "Após deletada a imagem não poderá ser recuperada. Deseja mesmo deletar?";
        var ok = "Imagem deletada com sucesso!";
    } else {
        var url = "/aplicacoes/" + id;
        var text = "Ao deletar a aplicação todas suas imagens serão deletadas juntas. Deseja mesmo deletar?";
        var ok = "Aplicação deletada com sucesso!";

    }
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    if (confirm(text)) {
        txt = "You pressed OK!";
        xhr.onload = function() {
            var produtos = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(produtos);
                document.location.href = "admin_aplicacoes";
                alert(ok)
            } else {
                console.error(produtos);
            }
        }
        xhr.send(null);
    }
}

//incicializa o JQuery-ui sortable desabilitado
$(function() {
    $("#getAplicacoes").sortable({
        disabled: true
    });

    $("#getAplicacoes").disableSelection();
});

//habilita o JQuery-ui sortable
function movimentar() {
    const div = document.createElement('div');
    div.id = "addBotao";
    div.innerHTML = `
<a class="btn btn-primary btn-md botao-oco" style="margin-right: 10px;" href="admin_aplicacoes">
Cancelar</a>
<a class="btn btn-primary btn-md textoBranco" style="cursor: pointer; background-color: #32CD32 !important; border-color: #32CD32 !important" onClick="salvar()"><i class="fas fa-check-circle"></i> Salvar</a>
`
    document.getElementById("addBotao").remove();
    document.getElementById("botoes").appendChild(div);
    $("#getAplicacoes").sortable("option", "disabled", false);
}

//salva a nova ordem das aplicacoes
function salvar() {
    var sorted = $("#getAplicacoes").sortable("toArray");
    console.log(sorted);
    for (var i = 0; i < sorted.length; i++) editarPosicao(sorted[i], i + 1);
    window.alert("Aplicações movidas com sucesso!");
    const div = document.createElement('div');
    div.id = "addBotao";
    div.innerHTML = `
    <a onClick="movimentar()" class="btn btn-primary btn-md textoBranco"
    style="margin-right: 10px;"><i class="fas fa-arrows-alt"></i>
    Movimentar</a>
<a class="btn btn-primary btn-md textoBranco" href="adicionar_aplicacao"><i
        class="fas fa-plus-circle"></i> Adicionar</a>
    `
    document.getElementById("addBotao").remove();
    document.getElementById("botoes").appendChild(div);
    $("#getAplicacoes").sortable({
        disabled: true
    });

    $("#getAplicacoes").disableSelection();

}

//registra a nova posição de cada aplicação
function editarPosicao(id, posicao) {
    var http = new XMLHttpRequest();
    url = '/aplicacoes/' + id + '/' + posicao;
    http.open('PUT', url, true);
    http.send();
}

function movimentarImagem(id, nome) {
    const div = document.createElement('div');
    div.id = "addBotao" + id;
    div.style = "float: right; margin-top: -50px; margin-bottom: 10px; cursor: pointer;"
    div.innerHTML = `
<a class="btn btn-primary btn-md botao-oco" style="margin-right: 10px;" href="admin_aplicacoes">
Cancelar</a>
<a class="btn btn-primary btn-md textoBranco" style="cursor: pointer; background-color: #32CD32 !important; border-color: #32CD32 !important" onClick="salvarImagem(` + id + `)"><i class="fas fa-check-circle"></i> Salvar</a>
`
    document.getElementById("addBotao" + id).remove();
    document.getElementById("botoes" + id).appendChild(div);
    $(function() {
        $("#getImagens" + id).sortable({
            disabled: false
        });

        $("#getImagens" + id).disableSelection();
    });
}

//salva a nova ordem das imagens
function salvarImagem(id) {
    var sorted = $("#getImagens" + id).sortable("toArray");
    for (var i = 0; i < sorted.length; i++) editarPosicaoImagem(sorted[i], i + 1);
    // window.alert("Imagens movidas com sucesso!");
    const div = document.createElement('div');
    div.id = "addBotao" + id;
    div.style = "float:right;"
    div.innerHTML = `
                                                <a onClick="movimentarImagem(` + id + `)"
                                                    class="btn btn-primary btn-md textoBranco"
                                                    style="margin-right: 10px; cursor: pointer;"><i
                                                        class="fas fa-arrows-alt"></i>
                                                    Movimentar</a>
                                                <a class="btn btn-primary btn-md textoBranco"
                                                    href="adicionar_imagem_aplicacao?id=` + id + `"><i
                                                        class="fas fa-plus-circle"></i>Adicionar</a>`

    document.getElementById("addBotao" + id).remove();
    document.getElementById("botoes" + id).appendChild(div);
    $("#getImagens" + id).sortable({
        disabled: true
    });

    $("#getImagens" + id).disableSelection();

}

//registra a nova posição de cada imagem
function editarPosicaoImagem(imagem_id, posicao) {
    var http = new XMLHttpRequest();
    url = '/imagens_aplicacoes/' + imagem_id + '/' + posicao;
    http.open('PUT', url, true);
    http.send();
}