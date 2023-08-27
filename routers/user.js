import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";


var userroutes = express.Router();

// update user
userroutes.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
                })
                res.status(200).json("Account has been updated")
        }
        catch(error){
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You can update your account only")
    }
})


// delete a user
userroutes.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("Account has been delete")
        }
        catch(error){
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You can delete your account only")
    }
})
// get a user 
// follow a user 
// unfollow a user 

export default userroutes;