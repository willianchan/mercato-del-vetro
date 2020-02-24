var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on' + event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
var id;
function init() {
    urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('id');
    this.document.getElementById("nome").value = urlParams.get('nome');
    this.document.getElementById("ref_imagem").innerHTML = urlParams.get('imagem');
}


function editar() {
    var form = document.forms.namedItem("fileinfo");
    oData = new FormData(form);
    var oReq = new XMLHttpRequest();
    oData.append("id", id)

    oReq.onload = function() {
        if (oReq.status != 201) {
            alert("Erro " + oReq.status + " ao editar aplicação")
            return false
        }
    }

    if (oData.get("nome") != "" && document.getElementById("inputGroupFile02").files.length != 0) {

        oReq.open("PUT", "aplicacoes/"+id, false);
        oReq.send(oData);
        window.location.href = "admin_aplicacoes";
    } else {
        alert("É necessário preencher nome e imagem!")
    }
    return false;

}
var id;