const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//@desc Register a user
//@route POST /api/users/register
//@access PUBLIC
const registerUser = asyncHandler(async (req,res) =>{
    const{username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All the fields are mandatory")
    }

    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already exists")
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)//10 is # salt rounds
    const user = await User.create({
        email,
        username,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error("User data is not valid")
    }
})


//@desc Login user
//@route POST /api/users/login
//@access PUBLIC
const loginUser = asyncHandler(async (req,res) =>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Enter email and the password")
    }

    const user = await User.findOne({email}) 

    //compare passwords
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, 

        process.env.ACCESS_TOKEN_SECRET,
        
        { expiresIn: "15m" })
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Invalid Credentials")
    }
})

//@desc User information
//@route GET /api/users/current
//@access PRIVATE
const currentUser = asyncHandler(async (req,res) =>{
    res.json({
        Salutaion: "hello",
        data: req.user,
    })
})

module.exports = {registerUser, loginUser, currentUser}
