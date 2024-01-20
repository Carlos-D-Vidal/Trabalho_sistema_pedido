const usuario = require("../rotas/usuario")

module.exports.cadastro_usuario = function (app,request,response)
{
    const conexao = app.config.conexao
    response.render('usuario/cadastro',{erros : {}, usuario : {}})
}

module.exports.login = function (app,request,response)
{
    const conexao = app.config.conexao
    response.render('usuario/login',{erros : {}, usuario : {}})
}

module.exports.cadastrar = function (app,request,response)
{
    const dados = request.body

    request.assert('nome','Voce deve preencher o campo nome').notEmpty()
    request.assert('email','Voce deve preencher o campo email').notEmpty()
    request.assert('senha','Voce deve preencher o campo senha').notEmpty()
    request.assert('senha','A senha deve ter no minimo 6 caracteres').len(6)

    let erros = request.validationErrors() ? request.validationErrors() : []

    if(dados.senha != dados.confirmar)
    {
        erros.push({msg: 'Senha não esta igual'})
    }
    
    if(erros.length>0)
    {
        response.render('usuario/cadastro',{erros : erros, usuario : dados})
        return
    }

    if(erros.length ==0){
        erros = false
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

modelUsuario.getUsuarioByEmail(dados.email, function(error,result){
    if (result.length > 0){
        let erros = [{msg: 'Este email já está em uso'}]
        response.render('usuario/cadastro',{erros : erros, usuario : dados})
    }
    else{
            modelUsuario.cadastrarUsuario(dados,function (error,result){
            response.redirect('/usuario/login')
        })
    }
})
}
module.exports.validar = function (app,request,response)
{
    const dados = request.body
    request.assert('email','Você deve preencher o campo email').notEmpty()
    request.assert('senha','Você deve preencher o campo senha').notEmpty()

    const erros = request.validationErrors()

    if(erros)
    {
        response.render('usuario/login',{erros:erros, usuario:dados})
        return
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getUsuario(dados, function(error, result){
        if(result.length <= 0)
        {
            let erros = [{msg:'Usuario não encontrado'}]
            response.render('usuario/login',{erros:erros, usuario:dados})
        }
        else
        {
            request.session.id_tipo_usuario = result[0].id_tipo_usuario
            request.session.id_usuario = result[0].id
            response.redirect('/')
        }
    })
}
module.exports.sair = function (app,request,response)
{
    request.session.destroy(function(error){
        response.redirect('/usuario/login')
    })
}
module.exports.abrirAlterar = function(app,request,response)
{
    if(request.session.id_tipo_usuario != 1 && request.session.id_tipo_usuario != 2)
    {
        response.redirect('/usuario/login')
        return
    }
    const idUsuario = request.session.id_usuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    modelUsuario.get(idUsuario,function(error,usuario){
        response.render('usuario/alterarDados',{usuario : usuario, erros:{}})
    })
}
module.exports.alterarDados = function(app,request,response)
{
    const dados = request.body
    const idUsuario = request.session.id_usuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    modelUsuario.alterarDados(dados,idUsuario, function(error, result){
        response.redirect('/')
    })
}
module.exports.abrirSenha = function(app,request,response)
{
    if(request.session.id_tipo_usuario != 1 && request.session.id_tipo_usuario != 2)
    {
        response.redirect('/usuario/login')
        return
    }
    const idUsuario = request.session.id_usuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    modelUsuario.get(idUsuario,function(error,usuario){
        response.render('usuario/alterarSenha',{usuario : usuario, erros:{}})
    })
}
module.exports.alterarSenha = function(app,request,response)
{
    const dados = request.body
    const idUsuario = request.session.id_usuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    modelUsuario.alterarSenha(dados,idUsuario, function(error, result){
        response.redirect('/')
    })
}