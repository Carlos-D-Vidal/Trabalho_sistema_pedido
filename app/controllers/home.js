module.exports.index = function (app,request,response)
{
    if(request.session.id_tipo_usuario != 1 && request.session.id_tipo_usuario != 2)
    {
        response.redirect('/usuario/login')
        return
    }
    const id_tipo_usuario = request.session.id_tipo_usuario
    response.render('home/index',{id_tipo_usuario : id_tipo_usuario})
}