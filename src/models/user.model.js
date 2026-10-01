import mongoose,{Schema} from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
{
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //To optimise search queries
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true ,//To remove whitespace from both ends of a string
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true,
    },
    coverImage:{
        type:String,

    },
    watchHistory:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"video"
    }],
    password:{
        type:String,//password when kept in database should be encrypted but a bit challenging
        required:[true,"Password is required"]
    },
    refreshTokens:{
        type:String
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)  //compares the password entered by user with the hashed password in database
}
    
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullname //fullName is used to display the name of the user in the frontend and this.fullname is used to store the name of the user in the database
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken=function(){
     return jwt.sign({
        _id:this._id,
    
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User=mongoose.model("User",userSchema)