module.exports = (req, res, next) => {
    //Verifica se o usuário esta logado
    if (!req.user){
        return res.status(401).send({ error : 'You must log in!' });
    }
    //Se o usuário estiver logado, vai para o proximo middleware
    next();
};