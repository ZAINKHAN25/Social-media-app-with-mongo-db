import  express  from "express"; 

var authroutes = express.Router();

authroutes.get('/', (req, res)=>{
    res.send("You are in home page of auth")
})
authroutes.get('/signuppage', (req, res)=>{
    res.send("You are in signuppage page")
})

export default authroutes;