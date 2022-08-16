import mongoose from "mongoose";
const addTaskSchema  = mongoose.Schema({
    _id:{
        type:Number
    },
    time:{
        type: String,
    },
    task:{
        type:String,
        require:[true,"task required"],
        trim:true
    },
    info:{
        type:String
    },
    userId:{
        type:String,
        trim:true,
        require:true
    },
    state:{
        type:String
    }

})
export default mongoose.model("taskList",addTaskSchema,"taskList")