function autenticate() {
    event.preventDefault()

    $.ajax({
        url: '/login',
        type: 'post',
        data: $('#login').serialize(),
        statusCode: {
            200: function () {
                window.location.href="/administracao";
            },
            400: function () {
                alert("Credenciais incorretas!");
            }
        }
    });
}