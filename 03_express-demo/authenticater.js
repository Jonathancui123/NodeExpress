function auth(req, res, next){
    console.log('Authenticating ...');
    next(); // CALL NEXT IN YOUR CUSTOM MIDDLEWARE!!
}

module.exports = auth;