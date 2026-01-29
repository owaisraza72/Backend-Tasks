const jwt = require('jsonwebtoken');
const { User } = require('../model/auth');

const AuthMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Unauthorized Access ! Please login first.");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const {id} = decoded;

       
        const user = await User.findById(id);

         if(!user){
            throw new Error("User not found");
         }

         req.user = user;
         next()




    } catch (error) {
        return res.status(401).send({ message: "Unauthorized", error: error.message });
    }
}


module.exports = {
    AuthMiddleware
};