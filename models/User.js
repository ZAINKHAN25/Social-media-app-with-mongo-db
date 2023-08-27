import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        max: 50,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

export default mongoose.model("User", UserSchema)