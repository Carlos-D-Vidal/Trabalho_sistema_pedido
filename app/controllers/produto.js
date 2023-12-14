const produto = require("../rotas/produto")

module.exports.listar = function (app, request, response) {
    if (request.session.id_tipo_usuario != 1 && request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return
    }

    const conexao = app.config.conexao
    const modelProduto = new app.app.models.modelProduto(conexao)
    modelProduto.listar(function (error, result) {
        response.render('usuario/listaProdutos', { produto: result })
    })
}
module.exports.adicionar = async function (app, request, response) {
    const idProduto = request.params.idProduto
    const idUsuario = request.session.id_usuario
    const conexao = app.config.conexao
    const modelPedido = new app.app.models.modelPedido(conexao)
    const modelCarrinho = new app.app.models.modelCarrinho(conexao)

    let pedido = await modelPedido.getPedidoAberto(idUsuario)
    if (pedido.length <= 0) {
        await modelPedido.criarPedido(idUsuario);
        pedido = await modelPedido.getPedidoAberto(idUsuario)
    }
    const idPedido = pedido[0].id
    request.session.idPedido = idPedido
    
    const constaCarrinho = await modelCarrinho.constaCarrinho(idPedido, idProduto)
    if (constaCarrinho.length <= 0) {
        modelCarrinho.inserir(idPedido, idProduto, function (error, result) {
            response.redirect('/produto/carrinho')
        })
    }
    else {
        modelCarrinho.adicionarQuantidade(idPedido, idProduto, function(error,result){
            response.redirect('/produto/carrinho')
        })
    }
}
module.exports.carrinho = async function (app,request, response){
    const conexao = app.config.conexao
    const idUsuario = request.session.id_usuario
    const modelPedido = new app.app.models.modelPedido(conexao)
    const modelCarrinho = new app.app.models.modelCarrinho(conexao)
    const modelProduto = new app.app.models.modelProduto(conexao)
    const modelFormaPagamento = new app.app.models.modelFormaPagamento(conexao)
    let pedido = await modelPedido.getPedidoAberto(idUsuario)
    if (pedido == undefined)
    {
        response.redirect('/usuario/listaProdutos')
        return
    }

    const idPedido = pedido[0].id
    const carrinho = await modelCarrinho.getProdutosCarrinho(idPedido)
    const formaPagamento = await modelFormaPagamento.getForma()
    
    let total = 0
    for (let i = 0; i < carrinho.length; i++) {
        carrinho[i]["produtos"] = await modelProduto.getProduto(carrinho[i].id_produto)
        total += carrinho[i].quantidade * carrinho[i]["produtos"].preco
    }
    response.render('usuario/carrinho', { carrinho : carrinho ,total : total,formaPagamento : formaPagamento})
}
module.exports.finalizar = async function (app,request,response){
    const conexao = app.config.conexao
    const idUsuario = request.session.id_usuario
    const id_forma_pagamento = request.params.id_forma_pagamento
    const modelPedido = new app.app.models.modelPedido(conexao)
    const modelCarrinho = new app.app.models.modelCarrinho(conexao)
    let pedido = await modelPedido.getPedidoAberto(idUsuario)
    const idPedido = pedido[0].id
}
