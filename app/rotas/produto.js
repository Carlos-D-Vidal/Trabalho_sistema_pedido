module.exports = function (app)
{
    app.get('/usuario/listaProdutos',function(request,response){
        app.app.controllers.produto.listar(app,request,response)
    })
    app.get('/produto/adicionar/:idProduto',function(request,response){
        app.app.controllers.produto.adicionar(app,request,response)
    })
    app.get('/produto/carrinho',function(request,response){
        app.app.controllers.produto.carrinho(app,request,response)
    })
    app.post('/produto/finalizar',function(request,response){
        app.app.controllers.produto.finalizar(app,request,response)
    })
}    