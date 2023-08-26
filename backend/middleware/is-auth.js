const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    console.log(req.method);
    if(req.method == 'OPTIONS'){
        return next()
    }
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1]
        console.log("admin prod" +token);
        try{
            const decodedToken = jwt.verify(token, 'Secret Key')
            return next()
        }catch(err){
            res.status(401).json("Not Authorized")
        }
    }
}
