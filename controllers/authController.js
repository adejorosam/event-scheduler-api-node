const User = require("../models/User");
const bcrypt = require("bcryptjs");
const securePassword = require('../utils/securePassword');
const authController = { 
    createUser: async (req, res) => {
        try{
            const userExists = await User.findOne(req.body.email);
            if(userExists){
                return res.status(400).json({error_msg: "Email already exists"});
            }

            req.body.password = await(securePassword(req.body.password));
            const user = new User(req.body);
            const saveUser = await user.save();
            const token = saveUser.getSignedToken();
            res.status(201).json({
                success:true, 
                msg: "User created successfully",
                data: token
            });
        }
        catch(error){
            return res.status(400).json({ error_msg: error.message });
        }
  },
  
  login: async(req, res) => {
      try{
        const userExists = await User.findOne(req.body.email);
        if(!userExists){
            return res.status(400).json({error_msg: "Email or password is incorrect"});
        }
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass){
            return res.status(400).json({error_msg: "E-mail or password is wrong"});
    
        }
        const token = user.getSignedToken();
        return res.status(200).json({token: token});
        
      }catch(error){
        return res.status(400).json({ error_msg: error.message });
      }
  }
};

module.exports = authController;