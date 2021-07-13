require("dotenv").config();
const jwt = require('jsonwebtoken');
const getSignedToken = async(user) => {
    const token = jwt.sign({ _id: user._id, 
        name: user.name, 
        email: user.email,
        password: user.password  }, 
        process.env.TOKEN_SECRET, { expiresIn: '3h' });
        return token;
}

module.exports = getSignedToken;