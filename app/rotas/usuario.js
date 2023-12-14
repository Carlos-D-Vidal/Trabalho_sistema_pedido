module.exports = function (app) {
    app.get('/cadastro_usuario', function (request, response) {
        app.app.controllers.usuario.cadastro_usuario(app, request, response)
    })

    app.post('/usuario/cadastrar', function (request, response) {
        app.app.controllers.usuario.cadastrar(app, request, response)
    })

    app.get('/usuario/login', function (request, response) {
        app.app.controllers.usuario.login(app, request, response)
    })

    app.post('/usuario/validar', function (request, response) {
        app.app.controllers.usuario.validar(app, request, response)
    })

    app.get('/usuario/sair', function (request, response) {
        app.app.controllers.usuario.sair(app, request, response)
    })
   
    app.get('/usuario/abrirAlterar', function(request,response)
    {
        app.app.controllers.usuario.abrirAlterar(app,request,response)
    })
    app.post('/usuario/alterarDados', function (request, response) {
        app.app.controllers.usuario.alterarDados(app, request, response)
    })
    app.get('/usuario/abrirSenha', function(request,response)
    {
        app.app.controllers.usuario.abrirSenha(app,request,response)
    })
    app.post('/usuario/alterarSenha', function (request, response) {
        app.app.controllers.usuario.alterarSenha(app, request, response)
    })
}   