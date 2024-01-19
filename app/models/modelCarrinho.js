function carrinho(conexao)
{
    this._conexao = conexao
}

carrinho.prototype.inserir = function(idPedido,idProduto,callback){
    this._conexao.query(`insert into carrinho values (null,${idPedido},${idProduto},1)`,callback)
}
carrinho.prototype.adicionarQuantidade = function(idPedido,idProduto,callback){
    this._conexao.query(`update carrinho set quantidade = quantidade + 1 where id_pedido = ${idPedido} and id_produto = ${idProduto}`,callback)
}
carrinho.prototype.constaCarrinho = function(idPedido,idProduto){
    return new Promise((resolve,reject)=>{
        this._conexao.query(`select * from carrinho where id_pedido = ${idPedido} and id_produto = ${idProduto}`,function(erros,result){
            console.log(erros)
            resolve(result)
        })
    })
}
carrinho.prototype.getProdutosCarrinho = function(idPedido){
    return new Promise((resolve,reject)=>{
        this._conexao.query(`select * from carrinho where id_pedido = ${idPedido}`,function(erros,result){
            resolve(result)
        })
    })    
}
carrinho.prototype.editarQuantidade = function(id,dados,callback){
    this._conexao.query(`update carrinho set quantidade = ${dados.quantidade} where id_produto = ${id}`,callback)
}
carrinho.prototype.removerProduto = function(id,callback){
    this._conexao.query(`delete from carrinho where id_produto = ${id}`,callback)
}
module.exports = function(){
    return carrinho
}