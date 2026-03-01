import mongoose, { Schema } from "mongoose";

const toDoSchema= new Schema({
    task:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:false,
    },

},{timestamps:true})

export default mongoose.model("ToDo",toDoSchema);