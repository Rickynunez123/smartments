//Check if the user is admin or not 
module.exports = function (req, res, next){
    if(!req.user.isAdmin) return res.status(403).send('Access denied. '); //forbiden  
    next();
}

