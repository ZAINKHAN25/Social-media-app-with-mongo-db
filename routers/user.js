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
});

// get a user 
userroutes.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error);
    }
})


// follow a user 

userroutes.put('/:id/follower', async (req, res)=>{
    if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant follow yourself");
      }
})

// unfollow a user 
userroutes.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });

export default userroutes;