import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
        fullname:{
            firstname: {
                type: String,
                required: true,
                trim: true,
                index: true,
                minlength: [3 , "first name must be 3 letter or long"]
            },
            lastname: {
                type: String,
                trim: true,
                index: true,
                minlength: [3 , "first name must be 3 letter or long"]
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
        },
        socketId:{
            type: String
        }
},{timestamps: true})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this._id } , 
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_SECRET_EXPIRE,
        }
    
    );
    return token;
}
// encrypt password and save password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// designing coustom methods
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.static.hashPassword = async function(password) {
    return await bcrypt.hash(password , 10);
}




export const User = new mongoose.model("User", userSchema);
