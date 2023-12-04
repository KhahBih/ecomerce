const admin = require('../firebase')

exports.authCheck = async (req, res, next) =>{
    try{
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authToken)
        console.log("check this", firebaseUser);
    }catch (error){
        res.status(401).json({
            error: "Unvalid or expired token"
        })
    }
}