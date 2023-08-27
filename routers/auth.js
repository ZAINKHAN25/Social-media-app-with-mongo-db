import  express  from "express"; 
import User from "../models/User.js";
import bcrypt from "bcrypt"

var authroutes = express.Router();

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
        console.log(error);
    }
})


export default authroutes;