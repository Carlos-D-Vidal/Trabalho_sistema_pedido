function pedido(conexao)
{
    this._conexao = conexao
}
pedido.prototype.getPedidoAberto = function(idUsuario){
    return new Promise((resolve,reject)=>{
        this._conexao.query(`select * from pedido where id_usuario = ${idUsuario} and id_status = 1`,function(erros,result){
            console.log(erros)
            resolve(result)
        })
    })
}
pedido.prototype.criarPedido = function(idUsuario){
    return new Promise((resolve,reject)=>{
        this._conexao.query(`insert into pedido values(null,${idUsuario},1,null)`,function(erros,result){
            resolve(result)
        })
    })
}
pedido.prototype.updateStatus = function(idUsuario,idForma){
    return new Promise((resolve,reject)=>{
        this._conexao.query(`update pedido values set id_forma_pagamento = ${idForma},id_status = 3 where id_usuario = ${idUsuario})`,function(erros,result){
            resolve(result)
        })
    })
}
pedido.prototype.updateForma = function(idForma,idPedido)
{
    return new Promise((resolve,reject)=>{
        this._conexao.query(`update pedido set id_forma_pagamento = ${idForma} where id = ${idPedido}`,function(erros,result){
            resolve(result)
        })
    })
}
module.exports = function(){
    return pedido
}