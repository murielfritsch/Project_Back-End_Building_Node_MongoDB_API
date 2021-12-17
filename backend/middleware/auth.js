const jwt = require('jsonwebtoken');

module.exports =  (req, res, next) => {
    try {
        // get token in the header > authorization > and get the elt in index position 1 when we split the authorizaton header content
        const token = req.headers.authorization.split(' ')[1];
        // decode token && verify token 
        // we pass the token as 1st argument & secret key as 2nd argument
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        // the decoded token is a JS object, so we can grab the userId from the object
        const userId = decodedToken.userId;
        // req.auth = {userId:userId};
        // raccourci JS pour attribuer une variable du même nom qu'une clef à une clef
        req.auth = {userId};
        if(req.body.userId && req.body.userId !== userId){
            throw "User Id not valid!"
        } else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error:error | "Requête non authentifiée !"})
    }
};

