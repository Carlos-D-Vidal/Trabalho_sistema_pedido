function tipoUsuario (conexao)
{
    this._conexao = conexao
}

tipoUsuario.prototype.getTipos = function(callback)
{
    this._conexao.query('select * from tipo_usuario', callback)
}

module.exports = function ()
{
    return tipoUsuario
}