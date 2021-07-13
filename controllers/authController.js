const User = require("../models/User");
const bcrypt = require("bcryptjs");
const securePassword = require('../utils/securePassword');
const jwt = require('jsonwebtoken');
const authController = { 
    createUser: async (req, res) => {
        try{
            const userExists = await User.findOne({ email: req.body.email });
            if(userExists){
                return res.status(400).json({error_msg: "Email already exists"});
            }
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: await securePassword(req.body.password),
            }); 
            const saveUser = await user.save();
            const token = jwt.sign({ _id: user._id, 
                name: user.name, 
                email: user.email,
            password: user.password  }, 
                process.env.TOKEN_SECRET, { expiresIn: '3h' });
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
        const user = await User.findOne({email: req.body.email}).select('+password');
        if(!user){
            return res.status(400).json({error_msg: "Email or password is incorrect"});
        }
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass){
            return res.status(400).json({error_msg: "E-mail or password is wrong"});
        }
        const token = jwt.sign({ _id: user._id, 
            name: user.name, 
            email: user.email  }, 
            process.env.TOKEN_SECRET, { expiresIn: '3h' });
        return res.status(200).json({token: token});
        
      }catch(error){
        return res.status(400).json({ error_msg: error.message });
      }
  }
};

module.exports = authController;