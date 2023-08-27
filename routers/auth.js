import  express  from "express"; 
import User from "../models/User.js";
import bcrypt from "bcrypt"

var authroutes = express.Router();

// Signup 
authroutes.post('/register', async (req, res)=>{
    try {
        // genereate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username : req.body.username,
            password: hashedPassword,
            email: req.body.email
            });

        // save user and respond
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Login
authroutes.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            res.status(404).json("User not found")
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        console.log(validPassword);
        if(!validPassword){
            res.status(400).json("Wrong Password")
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default authroutes;