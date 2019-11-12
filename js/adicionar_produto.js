var observe;
if (window.attachEvent) {
    observe = function(element, event, handler) {
        element.attachEvent('on' + event, handler);
    };
} else {
    observe = function(element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}

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
}


function adicionar() {
    var http = new XMLHttpRequest();
    var url = 'http://localhost:5000/produtos';
    var titulo = document.getElementById("titulo").value;
    var texto = document.getElementById("texto").value;
    var imagem = document.getElementById("imagem").value;
    console.log(imagem)
    if (titulo != "" && texto != "" && imagem != "") {
        var params = '{"titulo":' + '"' + titulo + '"' + ', "texto":' + '"' + texto + '"' + ', "imagem":' + '"' + imagem + '"' + '}';
        console.log(params);
        http.open('POST', url, true);
        http.send(params);
        document.location.href = "produtos.html";
        window.alert("Produto adicionado com sucesso!");
    } else window.alert("Preencha todos os campos para adicionar o produto");


}

function add() {
    var form = document.forms.namedItem("fileinfo");
    oData = new FormData(form);
    var oReq = new XMLHttpRequest();

    oReq.onload = function() {
        if (oReq.status == 201) {
            alert("Produto criado com sucesso!")
        } else {
            alert("Erro " + oReq.status + " ao criar produto")
            return false
        }
    }

    if (oData.get("titulo") != "" && oData.get("texto") != "" && document.getElementById("inputGroupFile02").files.length != 0) {

        oReq.open("POST", "http://localhost:5000/produtos", false);
        oReq.send(oData);
        window.location.href = "produtos.html";
    } else {
        alert("É necessário preencher título, descrição e imagem!")
    }
    return false;
}