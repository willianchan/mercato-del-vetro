var id;
function init() {
    urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('id');
}

function add() {
    var form = document.forms.namedItem("fileinfo");
    oData = new FormData(form);
    var oReq = new XMLHttpRequest();
    oData.append("id_ap", id)

    oReq.onload = function () {
        if (oReq.status == 201) {
            alert("Imagem criada com sucesso!")
        } else {
            alert("Erro " + oReq.status + " ao criar imagem")
            return false
        }
    }

    if (document.getElementById("inputGroupFile02").files.length != 0) {

        oReq.open("POST", "imagens_aplicacoes", false);
        oReq.send(oData);
        window.location.href = "admin_aplicacoes";
    } else {
        alert("É necessário preencher a imagem!")
    }
    return false;
}
