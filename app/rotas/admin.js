module.exports = function (app) {
    app.get('/admin/editar/:idUsuario', function (request, response) {
        app.app.controllers.admin.editar(app, request, response)
    })

    app.post('/admin/editarUsuario/:idUsuario', function (request, response) {
        app.app.controllers.admin.editarUsuario(app, request, response)
    })

    app.get('/admin/excluir/:idUsuario', function (request, response) {
        app.app.controllers.admin.excluirUsuario(app, request, response)
    })

    app.get('/admin/listar', function (request, response) {
        app.app.controllers.admin.getUsuarios(app, request, response)
    })

    app.get('/admin/abrirCadastro', function (request, response) {
        app.app.controllers.admin.abrirCadastro(app, request, response)
    })

    app.post('/admin/cadastroAdmin', function (request, response) {
        app.app.controllers.admin.cadastroAdmin(app, request, response)
    })

    app.get('/admin/abrirProduto', function (request, response) {
        app.app.controllers.admin.abrirProduto(app, request, response)
    })

    app.post('/admin/cadastroProduto', function (request, response) {
        app.app.controllers.admin.cadastroProduto(app, request, response)
    })

    app.get('/admin/listaProduto', function (request, response) {
        app.app.controllers.admin.listaProduto(app, request, response)
    })

    app.get('/admin/abrirEditar/:idProduto', function (request, response) {
        app.app.controllers.admin.abrirEditar(app, request, response)
    })

    app.post('/admin/editarProduto/:idProduto', function (request, response) {
        app.app.controllers.admin.editarProduto(app, request, response)
    })

    app.get('/admin/excluirProduto/:idProduto', function (request, response) {
        app.app.controllers.admin.excluirProduto(app, request, response)
    })
}

