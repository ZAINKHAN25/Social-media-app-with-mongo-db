import  express  from "express"; 

var userroutes = express.Router();

userroutes.get('/', (req, res)=>{
    res.send("You are in home page")
})
userroutes.get('/about', (req, res)=>{
    res.send("You are in about page")
})

export default userroutes;