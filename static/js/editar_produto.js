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
    var text = document.getElementById('texto');
    function resize() {
        text.style.height = 'auto';
        text.style.height = text.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize() {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change', resize);
    observe(text, 'cut', delayedResize);
    observe(text, 'paste', delayedResize);
    observe(text, 'drop', delayedResize);
    observe(text, 'keydown', delayedResize);

    text.focus();
    text.select();
    resize();
    urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('id');
    this.document.getElementById("titulo").value = urlParams.get('titulo');
    this.document.getElementById("texto").value = urlParams.get('texto');
    this.document.getElementById("ref_imagem").innerHTML = urlParams.get('imagem');
}


function editar() {
    var form = document.forms.namedItem("fileinfo");
    oData = new FormData(form);
    var oReq = new XMLHttpRequest();
    oData.append("id", id)

    oReq.onload = function() {
        if (oReq.status != 201) {
            alert("Erro " + oReq.status + " ao editar produto")
            return false
        }
    }

    if (oData.get("titulo") != "" && oData.get("texto") != "" && document.getElementById("inputGroupFile02").files.length != 0) {

        oReq.open("PUT", "produtos/"+id, false);
        oReq.send(oData);
        window.location.href = "admin_produtos";
    } else {
        alert("É necessário preencher título, descrição e imagem!")
    }
    return false;

}
var id;