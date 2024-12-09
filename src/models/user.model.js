import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,//indexing for faster search
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,//indexing for faster search
    },
    avatar: {
        type: String,//we will use cloudinary for image hosting
        required: true,


    },
    coverimage: {
        type: String,
        //indexing for faster search
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,//userdefined type of object id video schema ref is video   
        ref: "video",

    }],
    password: {
        type: String,//always encrypt the password
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    },
},
    {
        timestamps: true,
    }

)
//"Pre middleware functions are executed one 
//after another, when each middleware calls next"
//pre middleware is just just before user data is save in db so we can encrypt the password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    else {
        next();

    }
})
//custom methods
userSchema.methods.isPasswardCorrect=async function(password){//async await is used because of time in crptography
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            id: this._id,//defining payload id is payload and this.id is coming from db
            email:this.email ,//email  is payload and this.email is coming from db
            username: this.username,
            fullName: this.fullName,
        }, process.env.ACCESS_TOKEN_SECRET, //object to be encrypted
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }//buffer time for token to expire
    );
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { 
            id: this._id,//defining payload id is payload and this.id is coming from db
        }, process.env.REFRESH_TOKEN_SECRET, //object to be encrypted
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }//buffer time for token to expire
    );
}

export const User = mongoose.model("User", userSchema)