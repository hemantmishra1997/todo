import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"
const registerSchema = mongoose.Schema({
    _id:Number,
    uname:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        lowercase:true
        },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        trim:true  
    },
    info:{
        type:String
    },
    role:String,
    Status:Number

})
//plug in unique validatore
registerSchema.plugin(uniqueValidator)
export default mongoose.model("userRegister",registerSchema)