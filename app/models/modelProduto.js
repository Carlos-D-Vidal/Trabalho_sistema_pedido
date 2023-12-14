function produto(conexao)
{
    this._conexao = conexao
}
produto.prototype.listar = function(callback){
    this._conexao.query("select * from produto",callback)
}
produto.prototype.getProduto = function(idProduto){
    return new Promise((resolve,reject)=>{
        this._conexao.query(`select * from produto where id = ${idProduto}`,function(erros,result){
            console.log(erros)
            resolve(result[0])
        })
    })
}
module.exports = function(){
    return produto
}