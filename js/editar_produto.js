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
    this.document.getElementById("imagem").value = urlParams.get('imagem');
}


function editar() {
    var http = new XMLHttpRequest();
    var url = 'http://localhost/produtos/'+this.id;
    var titulo = document.getElementById("titulo").value;
    var texto = document.getElementById("texto").value;
    var imagem = document.getElementById("imagem").value;
    console.log(imagem)
    if (titulo != "" && texto != "" && imagem != "") {
        var params = '{"titulo":' + '"' + titulo + '"' + ', "texto":' + '"' + texto + '"' + ', "imagem":' + '"' + imagem + '"' + '}';
        console.log(params);
        http.open('PUT', url, true);
        http.send(params);
        document.location.href = "produtos.html";
        window.alert("Produto editado com sucesso!");
    }
    else window.alert("Preencha todos os campos para adicionar o produto");


}
var id;