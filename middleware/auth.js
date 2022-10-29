const jwt = require('jsonwebtoken');
const config = require('config');


/*
This function makes sure that the user that is trying to access x info
has an authenticated token 
*/ 

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Acccess denie. No token provided.');

    //verify the token is valid, first we store the key in an environmental variable 
    //first argument the token, second is the private key decoding 
    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex){
    //bad request 
    res.status(400).send('Invalid token. ')
}
}
module.exports = auth;