function FormaPagamento (conexao)
{
    this._conexao = conexao
}

FormaPagamento.prototype.getForma = function(callback)
{
    return new Promise((resolve,reject)=>{
        this._conexao.query(`select * from forma_pagamento`,function(erros,result){
            resolve(result)
        })
    })
}
module.exports = function ()
{
    return FormaPagamento
}