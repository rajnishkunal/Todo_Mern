import mongoose  from "mongoose";

const todoSchema =new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:[true,"Todo must have an owner"],
    },
    title:{
        type:String,
        require:[true,"Must provide an title"],
        
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },

});

const Todo=mongoose.model("Todo",todoSchema);

export default Todo;