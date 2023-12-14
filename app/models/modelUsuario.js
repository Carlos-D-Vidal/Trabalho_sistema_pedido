function usuario (conexao)
{
    this._conexao = conexao
    this._crypto = require('crypto')
}
usuario.prototype.cadastrarUsuario = function (dados,callback)
{
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`insert into usuario values(null,'${dados.nome}','${dados.senha}','${dados.email}',1)`, dados,callback)
}
usuario.prototype.getUsuarioByEmail = function (email,callback)
{
    this._conexao.query(`select * from usuario where email = '${email}'`, callback)
}
usuario.prototype.getUsuario = function(dados,callback)
{
    const senhaCriptografada = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`select * from usuario where email = '${dados.email}' and senha = '${senhaCriptografada}'`, callback)
}
usuario.prototype.getUsuarios = function(callback)
{
    this._conexao.query('select * from usuario',callback)
}
usuario.prototype.get = function(id,callback)
{
    this._conexao.query(`select * from usuario where id = ${id}`,callback)
}
usuario.prototype.excluirUsuario = function(id,callback)
{
    this._conexao.query(`delete from usuario where id = ${id}`, callback)
}
usuario.prototype.alterarDados = function(dados,id,callback)
{
    this._conexao.query(`update usuario set nome = '${dados.nome}', email = '${dados.email}' where id = ${id}`, callback)
}
usuario.prototype.alterarSenha = function(dados,id,callback)
{
    const senhaCriptografada = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`update usuario set senha = '${senhaCriptografada}' where id = ${id}`, callback)
}

module.exports = function()
{
    return usuario
}