module.exports.getUsuarios = function (app, request, response) {
    if (request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return
    }
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    modelUsuario.getUsuarios(function (error, result) {
        response.render('admin/listaUsuario', { usuario: result })
    })
}
module.exports.editar = function (app, request, response) {
    {
        if (request.session.id_tipo_usuario != 2) {
            response.redirect('/usuario/login')
            return
        }
        const idUsuario = request.params.idUsuario
        const conexao = app.config.conexao
        const modelUsuario = new app.app.models.modelUsuario(conexao)
        const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao)
        modelUsuario.get(idUsuario, function (error, usuario) {
            modelTipoUsuario.getTipos(function (error, tipos) {
                response.render('admin/editarUsuario', { usuario: usuario, tipos: tipos, erros: {} })
            })
        })
    }
}
module.exports.editarUsuario = function (app, request, response) {
    if (request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return
    }
    const dados = request.body
    const idUsuario = request.params.idUsuario
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    modelAdmin.editarUsuario(dados, idUsuario, function (error, result) {
        response.redirect('/admin/listar')
    })
}
module.exports.excluirUsuario = function (app, request, response) {
    const idUsuario = request.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    modelUsuario.excluirUsuario(idUsuario, function (error, result) {
        response.redirect('/admin/listar')
    })
}
module.exports.abrirCadastro = function (app, request, response) {
    if (request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return
    }
    const conexao = app.config.conexao
    const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao)
    modelTipoUsuario.getTipos(function (error, tipos) {
        response.render('admin/cadastroAdmin', { tipos: tipos, usuario: {}, erros: {} })
    })
}
module.exports.cadastroAdmin = function (app, request, response) {
    const dados = request.body

    request.assert('nome', 'Voce deve preencher o campo nome').notEmpty()
    request.assert('email', 'Voce deve preencher o campo email').notEmpty()
    request.assert('senha', 'Voce deve preencher o campo senha').notEmpty()
    request.assert('senha', 'A senha deve ter no minimo 6 caracteres').len(6)

    let erros = request.validationErrors()

    if (dados.senha != dados.confirmar) {
        erros.push({ msg: 'Senha não esta igual' })
    }

    if (erros) {
        response.render('admin/cadastroAdmin', { erros: erros, usuario: dados })
        return
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    modelUsuario.getUsuarioByEmail(dados.email, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'Este email já está em uso' }]
            response.render('usuario/cadastro', { erros: erros, usuario: dados })
        }
        else {
            modelAdmin.cadastroAdmin(dados, function (error, result) {
                response.redirect('/admin/listar')
            })
        }
    })
}
module.exports.abrirProduto = function (app, request, response) {
    if (request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return
    }
    const conexao = app.config.conexao
    response.render('admin/cadastroProduto', { erros: {}, produto: {} })
}
module.exports.cadastroProduto = function (app, request, response) {
    const dados = request.body
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)

    request.assert('descricao', 'Voce deve preencher o campo descrição').notEmpty()
    request.assert('preco', 'Voce deve preencher o campo preco').notEmpty()

    let erros = request.validationErrors()
    if (erros) {
        response.render('admin/cadastroProduto', { erros: erros, produto: dados })
        return
    }

    else {
        modelAdmin.cadastroProduto(dados, function (error, result) {
            response.redirect('/admin/listaProduto')
        })
    }
}
module.exports.listaProduto = function (app, request, response) {
    if (request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return
    }
    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)
    modelProduto.listar(function (error, result) {
        response.render('admin/listaProduto', { produto: result })
    })
}
module.exports.abrirEditar = function (app,request,response){
    if (request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return
    }
    const idProduto = request.params.idProduto
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    modelAdmin.getProduto(idProduto,function(error,result){
        response.render('admin/editarProduto', {produto : result})
    })
    
}
module.exports.editarProduto = function (app, request, response) {
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    const dados = request.body
    const idProduto = request.params.idProduto
    modelAdmin.editarProduto(dados,idProduto,function(error, result){
        response.redirect('/admin/listaProduto')
    })
}
module.exports.excluirProduto = function(app,request,response){
    const idProduto = request.params.idProduto
    const conexao = app.config.conexao
    const modelAdmin = new app.app.models.modelAdmin(conexao)
    modelAdmin.excluirProduto(idProduto, function (error, result) {
        response.redirect('/admin/listaProduto')
    })
}

